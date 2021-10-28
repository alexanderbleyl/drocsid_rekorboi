'use strict';

const utils = require('@iobroker/adapter-core');
const Discord = require('discord.js');

let client = null;

class Template extends utils.Adapter {
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
        this.on('unload', this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        client = new Discord.Client();
        client.login(this.config.bot_token);
        this.subscribeForeignStates(this.config.state);
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        callback();
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
    module.exports = (options) => new Template(options);
} else {
    // otherwise start the instance directly
    new Template();
}
