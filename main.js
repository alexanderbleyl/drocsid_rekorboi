'use strict';

const utils = require('@iobroker/adapter-core');
const Discord = require('discord.js');

let client = null;

class DiscordBot extends utils.Adapter {
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: 'discord_bot',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('message', this.message.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        if(this.config.bot_token === '') {
            this.log.error('No Bot-Token given!');
            return;
        }
        client = new Discord.Client();
        client.login(this.config.bot_token);
        if(this.config.state === '') {
            this.subscribeStates('sendMessage');
        } else {
            this.subscribeForeignStates(this.config.state);
        }
    }

    /**
     * Is called if a subscribed state changes
     * @param {object} obj
     */
    message(obj) {
        this.log.info('we receive a message from e.g. blockly');
        this.log.info(JSON.stringify(obj));
        if (typeof obj === 'object' && obj.message && this.config.channel_id) {
            if (obj.command === 'send' ) {
                // e.g. send email or pushover or whatever
                this.log.info(`Send "${obj.message.text}"`);
                client.channels.cache.get(this.config.channel_id).send(obj.message);
            }
        }
    }

    /**
     * Is called if a subscribed state changes
     * @param {string} id
     * @param {ioBroker.State | null | undefined} state
     */
    onStateChange(id, state) {
        if (state && state.val != '') {
            try {
                client.channels.cache.get(this.config.channel_id).send(state.val);
            } catch (e) {
                this.log.info(`could not send message "${state.val}"`);
            }
        } else {
            // The state was deleted
            this.log.info(`state ${id} deleted or value empty`);
        }
    }

}

if (require.main !== module) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new DiscordBot(options);
} else {
    // otherwise start the instance directly
    new DiscordBot();
}
