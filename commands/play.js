const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Play audio from a YouTube url.',

	execute: async (client, message, args) => {
		const url = args.join(' ');

		if (!url.includes('youtube'))
			return message.reply('please provide a valid YouTube url.');

		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel.connection) return message.reply(`I'm not in your voice channel. Try \`!join\`.`);

		let queue = client.queue.get(message.guild.id);

		const play = (song) => {
			const stream = ytdl(song.url, { filter: 'audioonly' });
			const dispatcher = queue.connection.playStream(stream)
				.on('end', () => {
					if (queue.songs.length === 0) {
						queue.textChannel.send(`I don't have more songs to play!`);
						queue.voiceChannel.leave();
						queue = null;
						client.queue.delete(message.guild.id);
					} else {
						queue.songs.shift();
						play(queue.songs[0]);
					}
				})
				.on('error', err => {
					if (err) return console.log(err);
				})
				.setVolumeLogarithmic(0.5);
			queue.textChannel.send(`Playing \`${song.title}\``);
		}

		const songInfo = await ytdl.getInfo(url);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
			playing: true
		};

		if (!queue) {
			queue = {
				connection: voiceChannel.connection,
				voiceChannel: voiceChannel,
				textChannel: message.channel,
				songs: []
			};
			client.queue.set(message.guild.id, queue);

			queue.songs.push(song);
			play(song);
		} else {
			queue.songs.push(song);
			message.channel.send(`${message.author} added: \`${song.title}\``);
		}
	}
}