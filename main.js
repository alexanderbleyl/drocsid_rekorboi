/* jshint -W097 */// jshint strict:false
/*jslint node: true */
'use strict';

const utils       = require('@iobroker/adapter-core');
const adapterName = require('./package.json').name.split('.').pop();

const Discord = require('discord.js');

let adapter;

// If started as allInOne mode => return function to create instance
if (module.parent) {
	module.exports = startAdapter;
} else {
	// or start the instance directly
	startAdapter();
}

function startAdapter(options) {
	options = options || {};
	Object.assign(options, {
		name: adapterName,
		// objectChange: (id, obj) => sendMessage(id, obj),
		statechange: (id, obj) => sendMessage(id, state),
		ready: main
	});
	
	adapter = new utils.Adapter(options);
	return adapter;
}

function main() {
	const client = new Discord.Client();
	client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}`, client.channels);
		
		client.channels.cache.get('870892950689812483').send('Hello here!');
		adapter.subscribeForeignStates('mqtt.0.info.discord_msg');
	});
	client.login('ODcwODk0ODIwNDY4NjAwODQy.YQTaAQ.Fq4JAn_4Y8lKEbNPxzDH5-8HyPg');
}

function sendMessage(id, state) {
	try {
		client.channels.cache.get('870892950689812483').send(state.val);
	} catch (e) {}
}

