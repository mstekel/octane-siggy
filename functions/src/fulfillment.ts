import {Parameters} from "actions-on-google";

const {
    dialogflow,
    Table,
    OpenUrlAction,
    BasicCard,
    Button,
    Suggestions
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

interface IntentHandlerInput {
    username: string;
    parameters: Parameters;
}


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
    console.log("Login started.");
    request.get(
        {
            url: getGrantTokenUrl(),
        },
        (error, response, body) => {

            if (error) {
                console.error("Login failed.");
                reject(error);
            } else {
                const responseBody = JSON.parse(body);
                console.log("Login button created. Target URL: " + responseBody.authentication_url);
                resolve({
                    octaneUserId: responseBody.identifier,
                    answers: [
                        'Click the button below to login with Octane',
                        new BasicCard({
                            title: 'Login With Octane',
                            text: 'Use the button below to open Octane Login Screen',
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
    console.log("Auhtentication started.");
    request.post(
        {
            url: getGrantTokenUrl(),
            json: {'identifier': octaneUserId}
        },
        (error, response, body) => {
            if (response.statusCode !== 200) {
                if (response.statusCode === 424) {
                    resolve({username: null});
                } else {
                    reject(error || {message: 'Server responded with HTTP ' + response.statusCode + '. Please check your Octane server availability'});
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

                    console.log('Auhtentication succeeded. Username: ' + username);

                    resolve({username: username});
                }).on('error', (err) => {
                    console.error('Authentication failed.');
                    reject(err);
                });
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

const findWorkItemRoot = (data: IntentHandlerInput) => new Promise((resolve, reject) => {
    console.log("findWorkitemRoot started");
    octane.workItemRoots.getAll({
        limit: 1
    }, (ex, items) => {
        if (ex) {
            reject(ex);
        } else {
            data.parameters.workItemRoot = {id: items[0].id, type: items[0].type};
            resolve(data);
        }
    });
});

const findSlots = (data: IntentHandlerInput) => new Promise((resolve, reject) => {
    console.log("findSlots started");
    const query = Query.field('entity_name').equal(data.parameters.type).and().field('required').equal(true);
    octane.metadata.getFields({
        query: query
    }, (ex, items) => {
        if (ex) {
            reject(ex);
        } else {
            console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
            console.log(items);
            data.parameters.slots = items;
            resolve(data);
        }
    });
});

const findReferenceValues = (data: IntentHandlerInput) => new Promise((resolve, reject) => {
    console.log("findReferenceValues started");
    /*const query = Query.field('entity_name').equal(data.parameters.type).and().field('required').equal(true);
    octane.metadata.getFields({
        query: query
    }, (ex, items) => {
        if(ex) {
            reject(ex);
        } else {
            console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
            console.log(items);
            data.parameters.slots = items;
            resolve(data);
        }
    });*/
    resolve(['New', 'In Progress', 'Closed']);
});

const intentMap = {
    'welcome': (data: IntentHandlerInput) => new Promise(resolve => {
        resolve({
            answers: [
                'Hello, I\'m Octane Siggy. Talk to me!',
                'Say "help" for the list of commands I understand.'
            ]
        });
    }),
    'my-top-priority-items': (data: IntentHandlerInput) => new Promise((resolve, reject) => {
        const userQuery = Query.field('name').equal(data.username);
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
                    if (items.hasOwnProperty(i) && items[i].subtype) {
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
                        answers: [
                            message + ' Below is the list: ',
                            new Table({
                                dividers: true,
                                columns: ['Name'],
                                rows: rows
                            })
                        ]
                    });
                } else {
                    resolve({answers: [message]});
                }
            }
        });
    }),
    'have-i-broken-the-build': (data: IntentHandlerInput) => new Promise((resolve, reject) => {
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
                    if (items.hasOwnProperty(i) && items[i].merged_on_it) {
                        youBrokeTheBuild = youBrokeTheBuild || data.username === items[i].merged_on_it.name;
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
                                if (users.hasOwnProperty(j)) {
                                    rows.push([users[j].name]);
                                }
                            }
                            if (rows.length > 0) {
                                message += 'Below is the list of people who have potentially broken the build: ';
                                resolve({
                                    answers: [
                                        message,
                                        new Table({
                                            dividers: true,
                                            columns: ['Breaker\'s Email'],
                                            rows: rows
                                        })
                                    ]
                                });
                            } else {
                                resolve({answers: [message]});
                            }
                        }
                    });
                } else {
                    message += ' No build breakers were found at all.';
                    resolve({answers: [message]});
                }
            }
        });
    }),
    'what-is-the-build-status': (data: IntentHandlerInput) => new Promise((resolve, reject) => {
        Promise.all([
            getLastRunStatusByPipelineName({name: 'ALM Octane Quick Master', shortName: 'Quick'}),
            getLastRunStatusByPipelineName({name: 'ALM Octane Full Master', shortName: 'Full'}),
            getLastRunStatusByPipelineName({name: 'MQM Root OP Nightly Master', shortName: 'Nightly'})
        ]).then(data1 => {
            let message = '';
            data1.forEach(text => {
                message = message.concat(JSON.stringify(text) + '.\n');
            });
            resolve({answers: [message]});
        }).catch(reject);
    }),
    'login': (data: IntentHandlerInput) => new Promise(resolve => {
        resolve({
            answers: [
                'You have been logged in to Octane Siggy.'
            ]
        });
    }),
    'logout': (data: IntentHandlerInput) => new Promise(resolve => {
        resolve({
            octaneUserId: null,
            octaneUsername: null,
            answers: [
                'You have been logged out from Octane Siggy. ' +
                'Optionally use the card below if you want to logout your web browser from Octane',
                new BasicCard({
                    title: 'Logout Your Web Browser From Octane',
                    text: 'Use the button below to logout your browser from Octane',
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
    'who-am-i': (data: IntentHandlerInput) => new Promise(resolve => {
        resolve({answers: ['Your username is ' + data.username]});
    }),
    'create-new-workitem': (data: IntentHandlerInput) => new Promise((resolve, reject) => {
        return findWorkItemRoot(data).then(findSlots).then((data1: IntentHandlerInput) => {
            const slots = (data1.parameters.slots as Array<any>).filter(s => s.name !== 'parent');
            const response = {
                answers: ['Please specify the ' + slots[0].name + ' of the ' + data1.parameters.type],
                context: {
                    name: 'expecting-slot',
                    lifespan: 1,
                    parameters: {
                        action: 'create',
                        type: data1.parameters.type,
                        entity: {parent: data1.parameters.workItemRoot},
                        slots: slots
                    }
                }
            };
            if(slots[0].field_type === 'reference') {
                findReferenceValues(slots[0])
                    .then(value => {
                        response.answers.push(new Suggestions(value));
                        resolve(response);
                    }).catch(reject);
            } else {
                resolve(response);
            }
        }).catch(reject);
    })
};

intentMap['help'] = data => new Promise(resolve => {
    const rows = [];
    for (const name in intentMap) {
        rows.push([name.replace(/-/g, ' ')]);
    }
    if (rows.length > 0) {
        resolve({
            answers: [
                'Below is the ' + rows.length + ' commands I understand: ',
                new Table({
                    columns: ['Command name'],
                    rows: rows
                })
            ]
        });
    }
});

const origConsoleLog = console.log.bind(console);
const origConsoleError = console.error.bind(console);

app.fallback(conv => {

    console.log('Handling intent: ' + conv.intent);
    console.log('Input: ' + JSON.stringify(conv.input));
    console.log('Parameters: ' + JSON.stringify(conv.parameters));
    console.log('Input context: ' + JSON.stringify(conv.contexts.input));
    console.log('Output context: ' + JSON.stringify(conv.contexts.output));

    const getLogMethod = name => (msg => {
        return {log: origConsoleLog, error: origConsoleError}[name]({
            message: msg,
            userId: conv.user.storage.octaneUserId,
            username: conv.user.storage.octaneUsername
        });
    });

    console.log = getLogMethod('log');
    console.error = getLogMethod('error');

    const handleError = (err) => {
        console.error(err);
        conv.ask('Error occurred: ' + err.message);
        conv.ask('See firebase logs for more details.')
    };

    try {

        const handleAnswers = data => {

            if (data.hasOwnProperty('octaneUserId')) {
                conv.user.storage.octaneUserId = data.octaneUserId;
            }
            if (data.hasOwnProperty('octaneUsername')) {
                conv.user.storage.octaneUsername = data.octaneUsername;
            }

            if (data.context) {
                conv.contexts.set(data.context.name, data.context.lifespan, data.context.parameters);
            }

            if (data.answers) {
                data.answers.forEach(q => conv.ask(q));
            }
        };

        const intentHandler = (data: IntentHandlerInput) => {
            const handler = intentMap[conv.intent]
                || (data1 => new Promise(resolve => {
                    resolve({answers: ['I don\'t support your request yet. Please open an enhancement request to Moshe Stekel from Micro Focus.']});
                }));
            return handler(data);
        };

        // here Siggy already asked for a parameter and she should decide if she need the next one
        if (conv.contexts.input['expecting-slot']) {
            return Promise.resolve({
                username: conv.user.storage.octaneUsername,
                parameters: conv.parameters
            }).then((data: IntentHandlerInput) => {
                const parameters = conv.contexts.input['expecting-slot'].parameters;
                parameters.entity[parameters.slots[0].name] = conv.input.raw;
                parameters.slots = (parameters.slots as Array<any>).slice(1);
                if ((parameters.slots as Array<any>).length > 0) {
                    // here Siggy needs the next parameter
                    conv.contexts.set('expecting-slot', 1, parameters);
                    if (parameters.slots[0].field_type === 'reference') {
                        return findReferenceValues(parameters.slots[0])
                            .then(value => {
                                conv.ask(
                                    'Please specify the ' + parameters.slots[0].name
                                    + ' of the ' + parameters.type + ' from this list below');
                                conv.ask(new Suggestions(value));

                            }).catch(handleError);
                    } else {
                        conv.ask('Please specify the ' + parameters.slots[0].name + ' of the ' + parameters.type);
                        return null;
                    }
                } else {
                    // all the parameters have beed provided
                    conv.ask('Created!!!\n' + JSON.stringify(parameters.entity));
                    return null;
                }
            });
        } else if (conv.intent === 'welcome' || conv.intent === 'help') {
            return intentHandler({
                username: conv.user.storage.octaneUsername,
                parameters: conv.parameters
            }).then(handleAnswers).catch(handleError);
        } else if (!conv.user.storage.octaneUserId) {
            return loginWithOctane().then(handleAnswers).catch(handleError);
        } else {
            return (conv.user.storage.octaneUsername ? Promise.resolve({username: conv.user.storage.octaneUsername}) : authenticate(conv.user.storage.octaneUserId)).then((data: IntentHandlerInput) => {
                conv.user.storage.octaneUsername = data.username;
                data.parameters = conv.parameters;
                return data.username ?
                    intentHandler(data).then(handleAnswers).catch(err => {
                        if (err.code === '401' || err.code === 401) {
                            conv.user.storage.octaneUsername = null;
                            return authenticate(conv.user.storage.octaneUserId).then((data1: IntentHandlerInput) => {
                                conv.user.storage.octaneUsername = data1.username;
                                data1.parameters = conv.parameters;
                                return intentHandler(data1).then(handleAnswers).catch(() => loginWithOctane().then(handleAnswers));
                            }).catch(handleError);
                        } else {
                            throw err;
                        }
                    }) : loginWithOctane().then(handleAnswers);
            }).catch(handleError);
        }
    } catch (ex) {
        handleError(ex);
        return null;
    }
});

exports.fulfillment = functions.https.onRequest(app);
