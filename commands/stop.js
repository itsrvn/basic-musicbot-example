module.exports = {
	name: 'stop',
	description: 'Stop the current playing music and leave voice channel.',

	execute: (client, message) => {
		const queue = client.queue.get(message.guild.id);
		if (!queue) return message.reply(`There's nothing to stop.`);
		queue.songs = [];
		queue.connection.dispatcher.end();
	}
}