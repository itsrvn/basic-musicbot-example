module.exports = {
	name: 'queue',
	description: 'Shows the current song queue.',

	execute: (client, message) => {
		const queue = client.queue.get(message.guild.id);
		if (!queue) return message.reply(`There's nothing queued.`);
		const queueStr = queue.songs.map((s, i) => `${++i} - ${s.title}`).join('\n');
		message.channel.send(`__**Song queue**__\n${queueStr}`);
	}
}