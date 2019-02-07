const {
    dialogflow,
    Permission,
    Table,
    OpenUrlAction,
    SignIn,
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
const CookieAccessInfo = require('cookiejar').CookieAccessInfo;


const octane = new Octane({
    protocol: 'https',
    host: 'center.almoctane.com',
    port: 443,
    shared_space_id: 1001,
    workspace_id: 1002,
    routesConfig: routesConfig
});

const authenticateAndDo = async (conv, foo) => new Promise((resolve) => {
    superagent.post('https://center.almoctane.com/authentication/grant_tool_token').send({identifier: conv.data.octaneUserId}).set('accept', 'json').end((err, res) => {
        const responseBody = JSON.parse(res.text);

        const host = octane.config.host || octane.constants.host;
        const protocol = octane.config.protocol || octane.constants.protocol || 'http';
        const port = octane.config.port || (protocol === 'https' ? 443 : 80);
        const pathPrefix = octane.config.pathPrefix
            ? '/' + octane.config.pathPrefix.replace(/(^[\/]+|[\/]+$)/g, '')
            : '';

        let baseUrl = protocol + '://' + host + ':' + port + pathPrefix +
            '/api/shared_spaces/' + octane.config.shared_space_id +
            '/workspaces/' + octane.config.workspace_id;

        //baseUrl = 'https://webhook.site/c987f5b5-8c73-4e21-a7b2-5c2e8e397a87';

        const jar = request.jar();
        const cookie = request.cookie(responseBody.cookie_name + '=' + responseBody.access_token + "; path=/; domain=.almoctane.com; Secure; HttpOnly; Expires=Tue, 19 Jan 2038 03:14:07 GMT;")
        jar.setCookie(cookie, baseUrl);
        const opt = {
            jar: jar,
            json: true,
            baseUrl: baseUrl
        };

        octane.requestor = request.defaults(opt);

        // octane.workItems.getAll({ limit: 1 }, ()=> {
        //     conv.ask(octane.requestor.jar);
        //     resolve();
        //
        // });

        foo(resolve);
    });

    // octane.authenticate({
    //     username: 'moshe.stekel@microfocus.com',
    //     password: 'Tashkent_100'
    // }, (err) => {
    //     if (err) {
    //         conv.ask(JSON.stringify(err.message));
    //         resolve();
    //     } else {
    //         foo(resolve);
    //     }
    // });
});

let permission = new Permission({
    permissions: 'NAME'
});

const loginWithOctane = conv => new Promise(resolve => {
    superagent.get('https://center.almoctane.com/authentication/grant_tool_token').end((err, res) => {
        const responseBody = JSON.parse(res.text);
        conv.data.octaneUserId = responseBody.identifier;
        conv.data.userName = 'moshe.stekel@microfocus.com';
        conv.ask('Login To Octane');
        conv.ask(new BasicCard({
            title: 'Login To Octane',
            text: 'Use the button below to open Octane Log-in Screen',
            buttons: [
                new Button({
                    title: 'Log In To Octane',
                    action: new OpenUrlAction({
                        url: responseBody.authentication_url
                    })
                })
            ]
        }));
        resolve();
    });
});

const getFoo = conv => {
    const userQuery = Query.field('name').equal(conv.data.userName);
    switch (conv.intent) {
        case 'welcome_intent':
            return resolve => {
                conv.ask('Hi, I\'m Octane Siggy. Talk to me!');
                resolve();
            }
        case 'my_top_priority_items':
            return resolve => {
                const query = Query.field('owner').equal(userQuery)
                    .and().field('subtype').inComparison(['defect', 'story'])
                    .and().field('phase').equal(Query.field('logical_name')
                        .inComparison(['phase.defect.new', 'phase.defect.opened', 'phase.story.new', 'phase.story.inprogress']));
                octane.workItems.getAll({
                    limit: 5,
                    query: query,
                    order_by: 'rank'
                }, (err, items) => {
                    if (err) {
                        conv.ask(JSON.stringify(err.message));
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
                                rows.push([items[i].subtype, items[i].name]);
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
                                columns: ['Type', 'Name'],
                                rows: rows
                            }));
                            resolve();
                        } else {
                            conv.ask(message);
                            resolve();
                        }
                    }
                });
            };
        case 'did_i_break_the_build':
            return resolve => {
                //Query.field('merged_on_it').equal(userQuery)
                const query1 = Query.field('subtype').inComparison(['gherkin_automated_run', 'run_automated'])
                    .and().field('latest_pipeline_run').equal(true).and().field('merged_on_it').notEqual(Query.NONE);
                octane.runs.getAll({
                    query: query1
                }, (err1, items) => {
                    if (err1) {
                        conv.ask(JSON.stringify(err1.message));
                        resolve();
                    } else {
                        let youBrokeTheBuild = false;
                        const userIds = [];
                        for (const i in items) {
                            if (items[i].merged_on_it) {
                                youBrokeTheBuild = youBrokeTheBuild || conv.data.userName === items[i].merged_on_it.name;
                                userIds.push(items[i].merged_on_it.id);
                            }
                        }
                        let message = 'You ' + (youBrokeTheBuild ? 'broke' : 'didn\'t break') + ' the build.';
                        if (userIds.length > 0) {
                            const query2 = Query.field('id').inComparison(userIds);
                            octane.workspaceUsers.getAll({
                                query: query2
                            }, (err2, users) => {
                                if (err2) {
                                    conv.ask(JSON.stringify(err2.message));
                                    resolve();
                                } else {
                                    const rows = [];
                                    for (const j in users) {
                                        rows.push([users[j].name]);
                                    }
                                    if (rows.length > 0) {
                                        message += 'Below is the list of people who broke the build: ';
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
            };
        case 'what_is_the_build_status':
            return resolve => {
                conv.ask('Master Quick status is green');
                conv.ask('Master Full status is red');
                resolve();
            }
        default:
            return resolve => {
                conv.ask('Octane doesn\'t support your request yet. Please ask Daniel Finkelstein for more budget.');
                resolve();
            }
    }
};

app.fallback(conv => {
    if (!conv.data.octaneUserId) {
        return loginWithOctane(conv);
    } else {
        return authenticateAndDo(conv, getFoo(conv));
    }
});

exports.fulfillment = functions.https.onRequest(app);
