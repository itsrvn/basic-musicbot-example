const { Client } = require('discord.js');
const config = require('./config.json');
const Handler = require('./handler');

const client = new Client();
const handler = new Handler(client);

client.queue = new Map();

client.on('ready', () => {
	console.log(`[INFO] Bot is online as "${client.user.tag}"`);
	handler.loadCommands()
		.then(client.on('message', message => handler.handle(message)));
});

client.login(config.token);
