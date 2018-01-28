module.exports = {
	name: 'skip',
	description: 'Skip the current playing song (if something is playing).',

	execute: (client, message) => {
		const queue = client.queue.get(message.guild.id);
		if (!queue) return message.reply(`there is nothing queued.`);
		if (queue.songs.length < 1) return message.reply(`there's nothing to play.`);

		const song = queue.songs[0];
		queue.textChannel.send(`${message.author} skipped: \`${song.title}\``);
		queue.connection.dispatcher.end();
	}
}