module.exports = {
	name: 'resume',
	description: 'resume the current paused song.',

	execute: (client, message) => {
		const queue = client.queue.get(message.guild.id);
		if (!queue) return message.reply(`there is nothing to resume.`);
		if (queue.songs.length < 1) return message.reply(`there's nothing to resume.`);

		const song = queue.songs[0];

		if (!song.playing) {
			song.playing = true;
			queue.textChannel.send(`${message.author} resumed: \`${song.title}\``);
			queue.connection.dispatcher.resume();
		} else return queue.textChannel.send(`Can't resume an already playing song.`);
	}
}