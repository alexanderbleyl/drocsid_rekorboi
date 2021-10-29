'use strict';

const utils = require('@iobroker/adapter-core');
const { Client, Intents } = require('discord.js');

/**
 * The adapter instance
 * @type {ioBroker.Adapter}
 */
let adapter;

let client = null;

function sendMessageToDiscord(message) {
    return new Promise((resolve, reject) =>  {
        if (message && adapter.config.channel_id) {
            client.channels.cache.get(adapter.config.channel_id).send(message);
            resolve();
        } else {
            reject();
        }
    });
}

/**
 * Starts the adapter instance
 * @param {Partial<utils.AdapterOptions>} [options]
 */
function startAdapter(options) {
    // Create the adapter and define its methods
    return adapter = utils.adapter(Object.assign({}, options, {
            name: 'discord_bot',
            ready: main,
            stateChange: (id, state) => {
                if(id.indexOf('receiveMessage') > 0) {
                    return;
                }
                // adapter.log.info(`state ${id} - ${JSON.stringify(state)}`);
                if (state && state.val != '') {
                    try {
                        sendMessageToDiscord(state.val);
                    } catch (e) {
                        adapter.log.info(`could not send message "${state.val}"`);
                    }
                } else {
                    // The state was deleted
                    adapter.log.info(`state ${id} deleted or value empty`);
                }
            },
            message: (obj) => {
                if (typeof obj === 'object' && obj.message) {
                    if (obj.command === 'send' ) {
                        if (typeof obj.message !== 'object') {
                            obj.message = {
                                text: obj.message
                            };
                        }
            
                        // e.g. send email or pushover or whatever
                        adapter.log.info(`Send ${obj.message.text}`);
            
                        sendMessageToDiscord(obj.message.text)
                            .then(() => {
                                // Send response in callback if required
                                obj.callback && adapter.sendTo(obj.from, obj.command, {result: 'Message sent'}, obj.callback);
                            })
                            .catch(err => {
                                adapter.log.error('Cannot send message: ' + err);
                                obj.callback && adapter.sendTo(obj.from, obj.command, {error: err}, obj.callback);
                            });
                    }
                }
            }
        }));
    }

function main() {
    if(!adapter.config.bot_token || adapter.config.bot_token === '') {
        adapter.log.error('No Bot-Token given!');
        return;
    }
    client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    client.login(adapter.config.bot_token);
    if(adapter.config.state === '') {
        adapter.subscribeStates('sendMessage');
    } else {
        adapter.subscribeForeignStates(adapter.config.state);
    }
    adapter.subscribeStates('receiveMessage');
    receiveMessage();
}

function receiveMessage() {
    client.on('message', async message => {
        if (message.author.bot) return;
        adapter.setStateAsync('receiveMessage', message.content, true);
        adapter.log.info(`received mesage: '${message.content}'`);
    });
}

// @ts-ignore parent is a valid property on module
if (module.parent) {
    // Export startAdapter in compact mode
    module.exports = startAdapter;
} else {
    // otherwise start the instance directly
    startAdapter();
}
