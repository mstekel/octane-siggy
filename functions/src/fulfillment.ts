const {
    dialogflow,
    Table,
    OpenUrlAction,
    BasicCard,
    Button
} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow();
const Octane = require('@microfocus/alm-octane-js-rest-sdk');
const Query = require('@microfocus/alm-octane-js-rest-sdk/lib/query');
const routesConfig = require('./routesConfig');
const request = require('request');
const setCookie = require('set-cookie-parser');

const octane = new Octane({
    protocol: 'https',
    host: 'center.almoctane.com',
    port: 443,
    shared_space_id: 1001,
    workspace_id: 1002,
    routesConfig: routesConfig,
});

const host = octane.config.host || octane.constants.host;
const protocol = octane.config.protocol || octane.constants.protocol || 'http';
const port = octane.config.port || (protocol === 'https' ? 443 : 80);
const pathPrefix = octane.config.pathPrefix
    ? '/' + octane.config.pathPrefix.replace(/(^[\/]+|[\/]+$)/g, '')
    : '';


const getBaseUrl = () => {
    return protocol + '://' + host + ':' + port + pathPrefix +
        '/api/shared_spaces/' + octane.config.shared_space_id +
        '/workspaces/' + octane.config.workspace_id;
};

const getGrantTokenUrl = () => {
    return protocol + '://' + host + ':' + port + pathPrefix + '/authentication/grant_tool_token';
};

const getSignOutUrl = () => {
    return protocol + '://' + host + ':' + port + pathPrefix + '/authentication/browser_sign_out';
};

const cookieSuffix = "path=/; domain=.almoctane.com; Secure;";

const loginWithOctane = () => new Promise((resolve, reject) => {
    request.get(
        {
            url: getGrantTokenUrl(),
        },
        (error, response, body) => {

            if (error) {
                reject(error);
            } else {
                const responseBody = JSON.parse(body);
                resolve({
                    octaneUserId: responseBody.identifier,
                    questions: [
                        'Login With Octane',
                        new BasicCard({
                            title: 'Login With Octane',
                            text: 'Use the button below to open Octane Log-in Screen',
                            buttons: [
                                new Button({
                                    title: 'Login With Octane',
                                    action: new OpenUrlAction({
                                        url: responseBody.authentication_url
                                    })
                                })
                            ]
                        })
                    ]
                });
            }
        });
});

const authenticate = (octaneUserId) => new Promise((resolve, reject) => {
    request.post(
        {
            url: getGrantTokenUrl(),
            json: {'identifier': octaneUserId}
        },
        (error, response, body) => {
            if (response.statusCode !== 200) {
                if (response.statusCode === 424) {
                    resolve(null);
                } else {
                    reject(error);
                }
            } else {
                const baseUrl = getBaseUrl();

                const jar = request.jar();

                jar.setCookie(request.cookie(body.cookie_name + '=' + body.access_token + '; ' + cookieSuffix), baseUrl);
                jar.setCookie(request.cookie('HPECLIENTTYPE=HPE_MQM_UI;' + cookieSuffix), baseUrl);

                const opt = {
                    jar: jar,
                    json: true,
                    baseUrl: baseUrl
                };

                octane.requestor = request.defaults(opt);

                octane.requestor.get('').on('response', res1 => {
                    const cookies = setCookie.parse(res1, {
                        decodeValues: true,
                        map: true
                    });
                    const username = Buffer.from(cookies['OCTANE_USER'].value, 'base64').toString();
                    resolve(username);
                }).on('error', reject);
            }
        });
});

const getLastRunStatusByPipelineName = pipeline => new Promise((resolve, reject) => {
    const query = Query.field('pipeline').equal(Query.field('name').equal(pipeline.name)).and()
        .field('status').notEqual(Query.field('logical_name').equal('list_node.pipeline_run_status.running'));
    octane.pipelineRuns.getAll({
        limit: 1,
        query: query,
        order_by: '-start_time'
    }, (ex, items) => {
        if (ex) {
            reject(ex);
        } else if (items && items.length > 0) {
            resolve(pipeline.shortName + ' status is ' + items[0].status.name);
        } else {
            reject(new Error('No run of pipeline ' + pipeline.name + ' found'));
        }
    });
});

const intentMap = {
    'welcome': username => new Promise((resolve, reject) => {
        resolve({
            questions: [
                'Hello, I\'m Octane Siggy. Talk to me!',
                'Say "help" for the list of commands I understand.'
            ]
        });
    }),
    'my_top_priority_items': username => new Promise((resolve, reject) => {
        const userQuery = Query.field('name').equal(username);
        const query = Query.field('owner').equal(userQuery)
            .and().field('subtype').inComparison(['defect', 'story'])
            .and().field('phase').equal(Query.field('logical_name')
                .inComparison(['phase.defect.new', 'phase.defect.opened', 'phase.story.new', 'phase.story.inprogress']));
        octane.workItems.getAll({
            limit: 5,
            query: query,
            order_by: 'rank'
        }, (ex, items) => {
            if (ex) {
                reject(ex);
            } else {
                const rows = [];
                let defectCount = 0,
                    storyCount = 0;
                for (const i in items) {
                    if (items[i].subtype) {
                        if (items[i].subtype === 'defect')
                            defectCount++;
                        else if (items[i].subtype === 'story')
                            storyCount++;
                        rows.push([items[i].subtype + ' #' + items[i].id + ': ' + items[i].name]);
                    }
                }
                let message = 'You have ' + items.length + ' most top items';
                if (defectCount > 0 && storyCount > 0) {
                    message += ': ' + defectCount + ' defects and ' + storyCount + ' user stories.'
                } else if (defectCount > 0) {
                    message += ': ' + defectCount + ' defects.';
                } else if (storyCount > 0) {
                    message += ': ' + storyCount + ' user stories.'
                } else {
                    message += '.';
                }

                if (rows.length > 0) {
                    resolve({
                        questions: [
                            message + ' Below is the list: ',
                            new Table({
                                dividers: true,
                                columns: ['Name'],
                                rows: rows
                            })
                        ]
                    });
                } else {
                    resolve({questions: [message]});
                }
            }
        });
    }),
    'did_i_break_the_build': username => new Promise((resolve, reject) => {
        const query1 = Query.field('subtype').inComparison(['gherkin_automated_run', 'run_automated'])
            .and().field('latest_pipeline_run').equal(true).and().field('merged_on_it').notEqual(Query.NONE);
        octane.runs.getAll({
            query: query1
        }, (ex, items) => {
            if (ex) {
                reject(ex);
            } else {
                let youBrokeTheBuild = false;
                const userIds = [];
                for (const i in items) {
                    if (items[i].merged_on_it) {
                        youBrokeTheBuild = youBrokeTheBuild || username === items[i].merged_on_it.name;
                        userIds.push(items[i].merged_on_it.id);
                    }
                }
                let message = 'You have' + (youBrokeTheBuild ? ' broken' : 'n\'t broken') + ' the build.';
                if (userIds.length > 0) {
                    const query2 = Query.field('id').inComparison(userIds);
                    octane.workspaceUsers.getAll({
                        query: query2
                    }, (ex1, users) => {
                        if (ex1) {
                            reject(ex1);
                        } else {
                            const rows = [];
                            for (const j in users) {
                                rows.push([users[j].name]);
                            }
                            if (rows.length > 0) {
                                message += 'Below is the list of people who have broken the build: ';
                                resolve({
                                    questions: [
                                        message,
                                        new Table({
                                            dividers: true,
                                            columns: ['Breaker\'s Email'],
                                            rows: rows
                                        })
                                    ]
                                });
                            } else {
                                resolve({questions: [message]});
                            }
                        }
                    });
                } else {
                    message += ' No build breakers were found at all.';
                    resolve({questions: [message]});
                }
            }
        });
    }),
    'what_is_the_build_status': username => new Promise((resolve, reject) => {
        Promise.all([
            getLastRunStatusByPipelineName({name: 'ALM Octane Quick Master', shortName: 'Quick'}),
            getLastRunStatusByPipelineName({name: 'ALM Octane Full Master', shortName: 'Full'}),
            getLastRunStatusByPipelineName({name: 'MQM Root OP Nightly Master', shortName: 'Nightly'})
        ]).then(data => {
            let message = '';
            data.forEach(text => {
                message = message.concat(JSON.stringify(text) + '.\n');
            });
            resolve({questions: [message]});
        }).catch(reject);
    }),
    'login': username => new Promise((resolve, reject) => {
        resolve({
            questions: [
                'You have been logged in to Octane Siggy.'
            ]
        });
    }),
    'logout': username => new Promise((resolve, reject) => {
        resolve({
            octaneUserId: null,
            questions: [
                'You have been logged out from Octane Siggy. ' +
                'Optionally use the card below if you want to logout your browser from Octane',
                new BasicCard({
                    title: 'Logout From Octane',
                    text: 'Use the button below to logout from Octane',
                    buttons: [
                        new Button({
                            title: 'Logout From Octane',
                            action: new OpenUrlAction({
                                url: getSignOutUrl()
                            })
                        })
                    ]
                })
            ]
        });
    }),
    'who_am_i': username => new Promise((resolve, reject) => {
        resolve({questions: ['Your username is ' + username]});
    })
};

intentMap['help'] = username => new Promise((resolve, reject) => {
    const rows = [];
    for (const name in intentMap) {
        rows.push([name.replace(/_/g, ' ')]);
    }
    if (rows.length > 0) {
        resolve({
            questions: [
                'Below is the ' + rows.length + ' commands I understand: ',
                new Table({
                    columns: ['Command name'],
                    rows: rows
                })
            ]
        });
    }
});

app.fallback(conv => {
    const handleError = (err) => {
        console.error(err);
        conv.ask('Error occurred: ' + err.message);
        conv.ask('See firebase logs for more details.')
    };

    try {
        const handleQuestions = data => {
            if (data.hasOwnProperty('octaneUserId')) {
                conv.user.storage.octaneUserId = data.octaneUserId;
            }
            data.questions && data.questions.forEach(q => conv.ask(q));
        };

        const intentHandler = intentMap[conv.intent] || (username => new Promise((resolve, reject) => {
            resolve({questions: ['Octane doesn\'t support your request yet. Please ask Daniel Finkelstein for more budget.']});
        }));

        if (conv.intent === 'welcome' || conv.intent === 'help') {
            return intentHandler().then(handleQuestions).catch(handleError);
        } else if (!conv.user.storage.octaneUserId) {
            return loginWithOctane().then(handleQuestions).catch(handleError);
        } else {
            return authenticate(conv.user.storage.octaneUserId).then(username => username ?
                new Promise(resolve => resolve(username)).then(intentHandler).then(handleQuestions) :
                loginWithOctane().then(handleQuestions)
            ).catch(handleError);
        }
    } catch (ex) {
        handleError(ex);
        return null;
    }
});

exports.fulfillment = functions.https.onRequest(app);
