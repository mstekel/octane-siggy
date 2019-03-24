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

const pluralMap = {
    defect: 'defects',
    story: 'stories',
    quality_story: 'quality_stories'
};

const defaultParameters = {
    story: {
        story_type_c_udf: {type: 'list_node', id: 'list_node.feature_type.Architecture'}
    }
};

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
    parameters?: Parameters;
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

const authenticate = (octaneUserId): Promise<IntentHandlerInput> => new Promise((resolve, reject) => {
    console.log("Auhtentication started.");
    request.post(
        {
            url: getGrantTokenUrl(),
            json: {'identifier': octaneUserId}
        },
        (error, response, body) => {
            if (response && response.statusCode !== 200) {
                if (response.statusCode === 424) {
                    resolve({username: null});
                } else {
                    reject(error || {message: 'Server responded with HTTP ' + response.statusCode + '. Please check your Octane server availability'});
                }
            } else if (error) {
                reject(error);
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

const findWorkItemRoot = (data: IntentHandlerInput): Promise<IntentHandlerInput> => new Promise((resolve, reject) => {
    console.log("findWorkitemRoot started");
    octane.workItemRoots.getAll({
        limit: 1
    }, (ex, items) => {
        if (ex) {
            reject(ex);
        } else {
            data.parameters.workItemRoot = {id: items[0].id, type: 'work_item'};
            resolve(data);
        }
    });
});

const findSlots = (data: IntentHandlerInput): Promise<IntentHandlerInput> => new Promise((resolve, reject) => {
    console.log("findSlots started");
    const query = Query.field('entity_name').equal(data.parameters.type).and().field('required').equal(true);
    octane.metadata.getFields({
        query: query
    }, (ex, items) => {
        if (ex) {
            reject(ex);
        } else {
            console.log(items);
            data.parameters.slots = items;
            resolve(data);
        }
    });
});

const findReferenceValues = (fieldMetadata): Promise<Array<any>> => new Promise((resolve, reject) => {
    console.log("findReferenceValues started");
    const refTypePlural = fieldMetadata.field_type_data.targets[0].type + 's';
    const query = Query.field('entity').equal(fieldMetadata.entity_name);
    if (octane[refTypePlural]) {
        octane[refTypePlural].getAll({
            query: query
        }, (ex, items) => {
            if (ex) {
                reject(ex);
            } else {
                resolve(items);
            }
        });
    } else reject('Type not found: ' + refTypePlural);
});

const intentMap = {
    'welcome': async (data: IntentHandlerInput) => {
        return {
            answers: [
                'Hello, I\'m Octane Siggy. Talk to me!',
                'Say "help" for the list of commands I understand.'
            ]
        };
    },
    'my-top-priority-items': async (data: IntentHandlerInput) => {
        const userQuery = Query.field('name').equal(data.username);
        const query = Query.field('owner').equal(userQuery)
            .and().field('subtype').inComparison(['defect', 'story'])
            .and().field('phase').equal(Query.field('logical_name')
                .inComparison(['phase.defect.new', 'phase.defect.opened', 'phase.story.new', 'phase.story.inprogress']));
        return await new Promise((resolve, reject) => {
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
        })
    },
    'have-i-broken-the-build': async (data: IntentHandlerInput) => {
        const query1 = Query.field('subtype').inComparison(['gherkin_automated_run', 'run_automated'])
            .and().field('latest_pipeline_run').equal(true).and().field('merged_on_it').notEqual(Query.NONE);
        return await new Promise((resolve, reject) => {
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
        })
    },
    'what-is-the-build-status': async (data: IntentHandlerInput) => {
        const data1 = await Promise.all([
            getLastRunStatusByPipelineName({name: 'ALM Octane Quick Master async', shortName: 'Quick'}),
            getLastRunStatusByPipelineName({name: 'ALM Octane Full Master', shortName: 'Full'}),
            getLastRunStatusByPipelineName({name: 'MQM Root OP Nightly Master', shortName: 'Nightly'})
        ]);
        let message = '';
        data1.forEach(text => {
            message = message.concat(JSON.stringify(text) + '.\n');
        });
        return {answers: [message]};
    },
    'login': async (data: IntentHandlerInput) => {
        return {
            answers: [
                'You have been logged in to Octane Siggy.'
            ]
        };
    },
    'logout': async (data: IntentHandlerInput) => {
        return {
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
        };
    },
    'who-am-i': async (data: IntentHandlerInput) => {
        return {answers: ['Your username is ' + data.username]};
    },
    'create-new-workitem': async (data: IntentHandlerInput) => {
        const data1 = await findSlots(await findWorkItemRoot(data));

        const slots = (data1.parameters.slots as Array<any>).filter(s => s.name !== 'parent' && s.name !== 'phase');
        const response = {
            answers: ['Please specify the ' + slots[0].name + ' of the ' + data1.parameters.type],
            context: {
                name: 'expecting-slot',
                lifespan: 1,
                parameters: {
                    action: 'create',
                    type: data1.parameters.type,
                    entity: {
                        parent: data1.parameters.workItemRoot,
                        phase: {type: 'phase', id: 'phase.' + data1.parameters.type + '.new'}
                    },
                    slots: slots
                }
            }
        };
        if (slots[0].field_type === 'reference') {
            const items: Array<any> = await findReferenceValues(slots[0]);
            response.answers.push(new Suggestions(items.map(i => i.name)));
            slots[0].items = items;
        }
        return response;
    }
};

intentMap['help'] = async data => {
    const rows = [];
    for (const name in intentMap) {
        rows.push([name.replace(/-/g, ' ')]);
    }
    if (rows.length > 0) {
        return {
            answers: [
                'Below are the ' + rows.length + ' commands I understand: ',
                new Table({
                    columns: ['Command name'],
                    rows: rows
                })
            ]
        };
    } else {
        return {
            answers: [
                'I don\'t support any commands'
            ]
        }
    }
};

const origConsoleLog = console.log.bind(console);
const origConsoleError = console.error.bind(console);

app.fallback(async conv => {

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
        const error = err.message && (err.message.errors || err.message) || err;
        console.error(error);
        conv.ask('Error occurred:' + JSON.stringify(error));
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
                || (async data1 => {
                    return {answers: ['I don\'t support your request yet. Please open an enhancement request to Moshe Stekel from Micro Focus.']};
                });
            return handler(data);
        };

        // here Siggy already asked for a parameter and she should decide if she need the next one
        if (conv.contexts.input['expecting-slot']) {
            const handler = async (data: IntentHandlerInput) => {
                const parameters = conv.contexts.input['expecting-slot'].parameters;
                let parameterValue = parameters.slots[0].items ? parameters.slots[0].items.filter(i => i.name === conv.input.raw) || null : conv.input.raw;
                if (parameters.slots[0].name === 'name') parameterValue = '[Created by Octane Siggy]: ' + parameterValue;
                parameters.entity[parameters.slots[0].name] = parameterValue;
                parameters.slots = (parameters.slots as Array<any>).slice(1);
                if ((parameters.slots as Array<any>).length > 0) {
                    // here Siggy needs the next parameter
                    conv.contexts.set('expecting-slot', 1, parameters);
                    if (parameters.slots[0].field_type === 'reference') {
                        const items: Array<any> = await findReferenceValues(parameters.slots[0]);
                        parameters.slots[0].items = items;
                        conv.ask(
                            'Please specify the ' + parameters.slots[0].name
                            + ' of the ' + parameters.type + ' from this list below');
                        conv.ask(new Suggestions(items.map(i => i.name)));

                    } else {
                        conv.ask('Please specify the ' + parameters.slots[0].name + ' of the ' + parameters.type);
                    }
                } else {
                    // all the parameters have beed provided
                    const answers = await new Promise((resolve, reject) => {
                        octane[pluralMap[parameters.type] || parameters.type + 's'][parameters.action](
                            Object.assign(parameters.entity, defaultParameters[parameters.type]),
                            (ex, item) => {
                                if (ex) {
                                    reject(ex);
                                } else {
                                    resolve({answers: [parameters.type + ' #' + item.id + ' created.']});
                                }
                            });
                    });
                    handleAnswers(answers);
                }
            };
            await handler({
                username: conv.user.storage.octaneUsername,
                parameters: conv.parameters
            });
        } else if (conv.intent === 'welcome' || conv.intent === 'help') {
            handleAnswers(await intentHandler({
                username: conv.user.storage.octaneUsername,
                parameters: conv.parameters
            }));
        } else if (!conv.user.storage.octaneUserId) {
            handleAnswers(await loginWithOctane());
        } else {
            const data: IntentHandlerInput = conv.user.storage.octaneUsername && conv.intent !== 'login' ?
                {username: conv.user.storage.octaneUsername}
                : await authenticate(conv.user.storage.octaneUserId);
            conv.user.storage.octaneUsername = data.username;
            data.parameters = conv.parameters;
            if (data.username) {
                try {
                    handleAnswers(await intentHandler(data));
                } catch (err) {
                    if (err.code === '401' || err.code === 401) {
                        conv.user.storage.octaneUsername = null;
                        const data1: IntentHandlerInput = await authenticate(conv.user.storage.octaneUserId);
                        conv.user.storage.octaneUsername = data1.username;
                        data1.parameters = conv.parameters;
                        try {
                            handleAnswers(await intentHandler(data1));
                        }
                        catch (err) {
                            handleAnswers(await loginWithOctane());
                        }
                    } else {
                        handleError(err);
                    }
                }
            } else {
                handleAnswers(await loginWithOctane());
            }
        }
    } catch (ex) {
        handleError(ex);
    }
});

exports.fulfillment = functions.https.onRequest(app);
