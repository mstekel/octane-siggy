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
const superagent = require('superagent').agent();
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
}

const cookieSuffix = "path=/; domain=.almoctane.com; Secure;";

const authenticateAndDo = (conv, foo) => new Promise((resolve, reject) => {
    try {
        superagent.post(getGrantTokenUrl()).send({identifier: conv.data.octaneUserId}).set('accept', 'json').then(res => {
            try {
                const baseUrl = getBaseUrl();

                const responseBody = JSON.parse(res.text);

                const jar = request.jar();
                const cookie = request.cookie(responseBody.cookie_name + '=' + responseBody.access_token + "; " + cookieSuffix);
                jar.setCookie(cookie, baseUrl);

                const opt = {
                    jar: jar,
                    json: true,
                    baseUrl: baseUrl
                };

                octane.requestor = request.defaults(opt);

                octane.requestor.get('').on('response', res1 => {
                    try {
                        const cookies = setCookie.parse(res1, {
                            decodeValues: true,
                            map: true
                        });
                        const username = Buffer.from(cookies['OCTANE_USER'].value, 'base64').toString();
                        foo(username).then(() => resolve());
                    } catch (ex) {
                        conv.ask(ex.message);
                        resolve();
                    }
                }).on('error', ex => {
                    conv.ask(ex.message);
                    resolve();
                });
            } catch (ex) {
                conv.ask(ex.message);
                resolve();
            }
        }).catch(ex => {
            conv.ask(ex.message);
            resolve();
        });
    } catch(ex) {
        conv.ask(ex.message);
        resolve();
    }
});

const loginWithOctane = conv => new Promise((resolve, reject) => {
    try {
        superagent.get(getGrantTokenUrl()).then(res => {
            try {
                const responseBody = JSON.parse(res.text);
                conv.data.octaneUserId = responseBody.identifier;
                conv.ask('Login With Octane');
                conv.ask(new BasicCard({
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
                }));
                resolve();
            } catch (ex) {
                conv.ask(ex.message);
                resolve();
            }
        }).catch(ex => {
            conv.ask(ex.message);
            resolve();
        });
    } catch(ex) {
        conv.ask(ex.message);
        resolve();
    }
});


const getFoo = conv => {
        try {
            switch (conv.intent) {
                case 'welcome_intent':
                    return (username) => new Promise((resolve, reject) => {
                        conv.ask('Hi, I\'m Octane Siggy. Talk to me!');
                        resolve();
                    });
                case 'my_top_priority_items':
                    return (username) => new Promise((resolve, reject) => {
                        try {
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
                                    conv.ask(ex.message);
                                    resolve();
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
                                            rows.push([items[i].subtype + ': ' +items[i].name]);
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
                                        conv.ask(message + ' Below is the list: ');
                                        conv.ask(new Table({
                                            dividers: true,
                                            columns: ['Name'],
                                            rows: rows
                                        }));
                                        resolve();
                                    } else {
                                        conv.ask(message);
                                        resolve();
                                    }
                                }
                            });
                        } catch (ex) {
                            conv.ask(ex.message);
                            resolve();
                        }
                    });
                case 'did_i_break_the_build':
                    return (username) => new Promise((resolve, reject) => {
                        const query1 = Query.field('subtype').inComparison(['gherkin_automated_run', 'run_automated'])
                            .and().field('latest_pipeline_run').equal(true).and().field('merged_on_it').notEqual(Query.NONE);
                        octane.runs.getAll({
                            query: query1
                        }, (ex, items) => {
                            if (ex) {
                                conv.ask(JSON.stringify(ex.message));
                                resolve();
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
                                            conv.ask(JSON.stringify(ex1.message));
                                            resolve();
                                        } else {
                                            const rows = [];
                                            for (const j in users) {
                                                rows.push([users[j].name]);
                                            }
                                            if (rows.length > 0) {
                                                message += 'Below is the list of people who have broken the build: ';
                                                conv.ask(message);
                                                conv.ask(new Table({
                                                    dividers: true,
                                                    columns: ['Breaker\'s Email'],
                                                    rows: rows
                                                }));
                                                resolve();
                                            } else {
                                                conv.ask(message);
                                                resolve();
                                            }
                                        }
                                    });
                                } else {
                                    message += ' No build breakers were found at all.';
                                    conv.ask(message);
                                    resolve();
                                }
                            }
                        });
                    });
                case 'what_is_the_build_status':
                    return username => new Promise((resolve, reject) => {
                        conv.ask('Master Quick status is green');
                        conv.ask('Master Full status is red');
                        resolve();
                    });
                case 'logout':
                    return username => new Promise((resolve, reject) => {
                        conv.data.octaneUserId = null;
                        conv.ask('You have been logged out.')
                        resolve();
                    });
                case 'who_am_i':
                    return username => new Promise((resolve, reject) => {
                        conv.ask('Your username is ' + username);
                        resolve();
                    });
                default:
                    return (username) => new Promise((resolve, reject) => {
                        conv.ask('Octane doesn\'t support your request yet. Please ask Daniel Finkelstein for more budget.');
                        resolve();
                    });
            }
        } catch(ex) {
            return (username) => new Promise((resolve, reject) => {
                conv.ask(ex.message);
                resolve();
            });
        }
    };

app.fallback(conv => {
    try {
        if (!conv.data.octaneUserId) {
            return loginWithOctane(conv);
        } else {
            return authenticateAndDo(conv, getFoo(conv));
        }
    } catch(ex) {
        conv.ask(ex.message);
        return null;
    }
});

exports.fulfillment = functions.https.onRequest(app);
