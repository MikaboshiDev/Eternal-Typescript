import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonInteraction,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { Manager } from '../../../structure/client';
import tracks from '../../../models/servers/tracks';
import { formatDuration } from '../../../functions/tools/musicFunctions';
module.exports = {
  id: 'skip',
  async execute(interaction: any, client: Manager) {
    const player = client.poru.players.get(interaction.guildId);
    if (!player)
      return interaction.reply({
        content: [
          `${emojis.error} The queue is empty or there is no song playing`,
          `consider adding a song with the \`play\``,
        ].join('\n'),
        ephemeral: true,
      });
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member?.voice?.channel) {
      return interaction.reply({
        content: [
          `${emojis.error} You have to be on a voice channel for this command to work`,
          'consider joining a voice channel and try again',
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
          'consider joining the same voice channel as me and try again',
        ].join('\n'),
        ephemeral: true,
      });
    }
    await interaction.deferUpdate();
    await player.stop();
  },
};
