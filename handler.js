const { Collection } = require('discord.js');
const glob = require('glob');
const path = require('path');

class Handler {
	constructor(client, prefix = '!') {
		this.prefix = prefix;
		this.client = client;
		this.commands = new Collection();
	}

	loadCommands() {
		const items = [];

		items.push(...glob.sync(`${path.join(__dirname, 'commands')}/**/*.js`));

		for (const item of items) {
			if (require.cache[require.resolve(item)]) delete require.cache[require.resolve(item)];
			const command = require(item);

			if (!this.commands.has(command.name)) {
				this.commands.set(command.name, command);
				if (command.aliases && command.aliases.length > 0) {
					for (const alias of command.aliases) {
						if (!this.aliases.has(alias)) {
							this.aliases.set(alias, command.name);
						} else continue;
					}
				}
			} else continue;
		}
		console.log(`[INFO] Commands were loaded.`);
		return Promise.resolve();
	}

	async handle(message) {
		if (!message.content.startsWith(this.prefix)) return;
		if (message.author.bot) return;

		const split = message.content.split(/\s+/g);
		const cmd = split[0].slice(this.prefix.length);
		const args =split.slice(1);

		let command;
		if (this.commands.has(cmd)) {
			command = this.commands.get(cmd);
		} else if (this.aliases.has(cmd)) {
			const _name = this.aliases.get(cmd);
			command = this.commands.get(_name);
		}

		if (!command) return;

		command.execute(this.client, message, args);
		console.log(`[COMMAND] ${message.author.tag} executed "${command.name}".`)
	}
}

module.exports = Handler;
