module.exports = {
	name: 'pause',
	description: 'Pause the current playing song.',

	execute: (client, message) => {
		const queue = client.queue.get(message.guild.id);
		if (!queue) return message.reply(`there is nothing to pause.`);
		if (queue.songs.length < 1) return message.reply(`there's nothing to pause.`);

		const song = queue.songs[0];

		if (song.playing) {
			song.playing = false;
			queue.textChannel.send(`${message.author} paused: \`${song.title}\``);
			queue.connection.dispatcher.pause();
		} else return queue.textChannel.send(`Can't pause an already paused song.`);
	}
}