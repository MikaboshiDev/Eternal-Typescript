import { EmbedBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import { Command } from '../../../class/builders';

export default new Command(
  new ContextMenuCommandBuilder().setName('getAvatar').setType(ApplicationCommandType.User).setDMPermission(false),
  async (client, interaction: any) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('Green')
          .setTimestamp()
          .setImage(interaction.targetUser.displayAvatarURL({ forceStatic: true }))
          .setTitle(`${interaction.targetUser.username}'s Avatar`),
      ],
      ephemeral: true,
    });
  }
);
