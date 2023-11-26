import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { formatDuration, spotifyURL } from '../../../functions/tools/musicFunctions';
import { Command } from '../../../class/builders';
import emojis from '../../../../config/json/emojis.json';

export default new Command(
  new SlashCommandBuilder()
    .setName('play')
    .setDescription('🎵 Play a song')
    .addStringOption((option) =>
      option.setName('cancion').setDescription('🎵 Name of the song to play').setAutocomplete(true).setRequired(true)
    ),
  async (client, interaction) => {
    const song = interaction.options.getString('cancion');
    const cancion = spotifyURL(song!);

    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member?.voice?.channel) {
      return interaction.reply({
        content: [
          `${emojis.error} You have to be on a voice channel for this command to work`,
          `consider joining a voice channel and trying again`,
        ].join('\n'),
        ephemeral: true,
      });
    } else if (
      interaction.guild!.members.me?.voice?.channel &&
      member.voice?.channel.id != interaction.guild!.members.me?.voice?.channel.id
    ) {
      return interaction.reply({
        content: [
          `${emojis.error} You must be on the same voice channel as me for this command to work`,
          `consider joining the same voice channel as me and trying again`,
        ].join('\n'),
        ephemeral: true,
      });
    }
    if (/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(cancion)) {
      return interaction.reply({
        content: [
          `${emojis.error} This command does not support YouTube links`,
          `consider using the command \`play\` to play a song`,
        ].join('\n'),
        ephemeral: true,
      });
    }

    const player = client.poru.createConnection({
      guildId: interaction.guildId,
      voiceChannel: member?.voice?.channel?.id,
      textChannel: interaction.channel?.id,
      deaf: true,
    });

    let resolve = await client.poru.resolve({ query: cancion, source: 'spotify', requester: interaction.user });
    const { loadType, tracks, playlistInfo } = resolve;
    if (loadType === 'PLAYLIST_LOADED') {
      for (const track of resolve.tracks) {
        track.info.requester = interaction.user;
        player.queue.add(track);
      }
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Playlist **${playlistInfo.name}** with **${tracks.length} songs** added`)
            .setColor('Green'),
        ],
      });
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
      const track = tracks.shift();
      track.info.requester = interaction.user;
      player.queue.add(track);
      const trackDuration = track.info.isStream ? 'LIVE' : formatDuration(track.info.length);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Song **[${track.info.title}](${track.info.uri})** by \`${track.info.author}\` - \`${trackDuration}\` added`
            )
            .setColor('Green'),
        ],
      });

      if (!player.isPlaying && !player.isPaused) return player.play();
    } else {
      await player.destroy();
      return interaction.reply({
        content: [
          `${emojis.error} There was an error playing the song`,
          `consider trying again or using the command \`play\` to play a song`,
        ].join('\n'),
        ephemeral: true,
      });
    }
  },
  {
    autocomplete: async (client, interaction) => {
      const cancion = interaction.options.getFocused();
      const res = await client.poru.resolve({ query: cancion, source: 'spotify', requester: interaction.user });
      const { tracks } = res;

      const results = tracks.slice(0, 5);

      const songs = [];

      for (let i = 0; i < results.length; i++) {
        const track = results[i];

        let label = `${track.info.title}`;
        let dc = `${track.info.author}`;

        if (label.length > 50) label = label.substring(0, 47) + '...';
        if (dc.length > 50) dc = dc.substring(0, 47) + '...';

        songs.push({
          name: `${label} de ${dc}`,
          value: `${track.info.uri}`,
        });
      }
      return interaction.respond(songs.map((song) => ({ name: `${song.name}`, value: `${song.value}` })));
    },
  }
);
