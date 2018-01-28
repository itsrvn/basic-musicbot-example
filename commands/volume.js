module.exports = {
	name: 'volume',
	description: 'Set the current playback volume. (0 - 1, more is higher than original.)',

	execute: (client, message, args) => {
		const queue = client.queue.get(message.guild.id);
		if (!queue) return message.reply(`there is nothing queued.`);
		if (queue.songs.length < 1) return message.reply(`there are no songs.`);

		const volume = args[0];
		if (Number.isNaN(volume)) return message.reply(`Enter a value between 0 - 1 for volume.`);

		queue.connection.dispatcher.setVolumeLogarithmic(Number(volume));
		message.channel.send(`Set the playback volume to: \`${Number(volume) * 100}%\``);
	}
}