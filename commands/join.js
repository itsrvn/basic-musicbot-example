module.exports = {
	name: 'join',
	description: 'Make the bot join your voice channel.',

	execute: (client, message) => {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.reply('You need to be in a voice channel first.');
		const permissions = voiceChannel.permissionsFor(message.guild.me);
		if (!permissions.has('CONNECT')) return message.reply(`It seems like I don't have permission to join this channel.`);
		if (!permissions.has('SPEAK')) return message.reply(`It seems like I don't have permission to speak in this channel.`);

		voiceChannel.join()
			.then(() => console.log(`[INFO] Joined voice channel: "${voiceChannel.name}" in guild: "${message.guild.name}"`));
	}
}