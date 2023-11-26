import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import emojis from '../../../../config/json/emojis.json';

export default new Command(
  new SlashCommandBuilder().setName('skip').setDescription('🎵 Skip to the next song'),
  async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild?.id);
    if (!player)
      return interaction.reply({
        content: [
          `${emojis.error} The queue is empty or there is no song playing right now`,
          `consider adding a song with the command \`play\``,
        ].join('\n'),
        ephemeral: true,
      });
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member?.voice?.channel) {
      return interaction.reply({
        content: `${emojis.error} You have to be on a voice channel for this command to work`,
        ephemeral: true,
      });
    } else if (
      interaction.guild!.members.me?.voice?.channel &&
      member.voice?.channel.id != interaction.guild!.members.me?.voice?.channel.id
    ) {
      return interaction.reply({
        content: `${emojis.error} You must be on the same voice channel as me for this command to work`,
        ephemeral: true,
      });
    }
    player.stop();
    return interaction.reply({
      content: `${emojis.correct} The song has been skipped`,
      ephemeral: true,
    });
  }
);
