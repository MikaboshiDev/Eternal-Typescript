import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonInteraction,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { Manager } from '../../../structure/client';
import tracks from '../../../models/servers/tracks';
import { formatDuration } from '../../../functions/tools/musicFunctions';

module.exports = {
  id: 'playlist',
  async execute(interaction: any, client: Manager) {
    const player = client.poru.players.get(interaction.guildId);
    if (!player) return interaction.reply({
      content: [
         `${emojis.error} The queue is empty or there is no song playing`,
         `consider adding a song with the \`play\``,
      ].join("\n"),
      ephemeral: true,
    });
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member?.voice?.channel) {
      return interaction.reply({
         content: [
             `${emojis.error} You have to be on a voice channel for this command to work`,
             'consider joining a voice channel and try again',
         ].join("\n"),
         ephemeral: true,
      });
    } else if (
      interaction.guild!.members.me?.voice?.channel &&
      member.voice?.channel.id != interaction.guild!.members.me?.voice?.channel.id
    ) {
      return interaction.reply({
         content: [
             `${emojis.error} You must be on the same voice channel as me for this command to work`,
             'consider joining the same voice channel as me and try again',
         ].join("\n"),
         ephemeral: true,
      });
    }
    const queue = player.queue.length > 5 ? player.queue.slice(0, 5) : player.queue;
    if (!queue)
      return interaction.reply({
        content: [
            `${emojis.error} There are not as many songs as to have a playlist`,
            `consider adding a song with the \`play\``,
        ].join('\n'),
        ephemeral: true,
      });
    const trackDuration = player.currentTrack.info.isStream ? 'LIVE' : formatDuration(player.currentTrack.info.length);
    const embed = new EmbedBuilder()
      .setAuthor({ name: 'Play list', iconURL: interaction.guild?.iconURL()! })
      .setThumbnail(player.currentTrack.info.image)
      .addFields({
        name: 'Playing',
        value: `[${player.currentTrack.info.title}](${player.currentTrack.info.uri}) de \`${player.currentTrack.info.author}\` - \`${trackDuration}\``,
        inline: true,
      })
      .setColor('Green')
      .setFooter({ text: `Songs on hold: ${player.queue.length} Songs` });

    if (queue.length)
      embed.addFields([
        {
          name: 'Play List',
          value: queue
            .map(
              (track: any, index: any) =>
                `**${index + 1}.** [${track.info.title}](${track.info.uri}) de \`${
                  track.info.author
                }\` - \`${formatDuration(track.info.length)}\``
            )
            .join('\n'),
        },
      ]);
    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
