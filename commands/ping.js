module.exports = {
	name: 'ping',
	description: 'Shows the bots ping to the Discord API.',

	execute: (client, message) => {
		message.channel.send('Pinging...')
			.then(msg => {
				msg.edit(`:ping_pong: Pong took \`${msg.createdTimestamp - message.createdTimestamp}ms\`!`);
			});
	}
}