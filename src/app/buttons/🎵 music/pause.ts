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
  id: 'pause',
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
    if (player.isPaused) {
      const stop = new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Stop').setCustomId('stop');
      const skip = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Skip').setCustomId('skip');
      const pause = new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Pause').setCustomId('pause');
      const list = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('List').setCustomId('playlist');
      const auto = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('AutoPlay').setCustomId('autoplay');
      const msg = interaction.message;
      await msg.edit({
        embeds: [msg.embeds[0]],
        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(pause, skip, stop, list, auto)],
      });
      await interaction.deferUpdate();
      player.pause(false);
    } else {
      player.pause(true);
      const stop = new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Stop').setCustomId('stop');
      const skip = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Skip').setCustomId('skip');
      const pause = new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Continue').setCustomId('pause');
      const list = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('List').setCustomId('playlist');
      const auto = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('AutoPlay').setCustomId('autoplay');
      const msg = interaction.message;
      await msg.edit({
        embeds: [msg.embeds[0]],
        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(pause, skip, stop, list, auto)],
      });
      await interaction.deferUpdate();
    }
  },
};
