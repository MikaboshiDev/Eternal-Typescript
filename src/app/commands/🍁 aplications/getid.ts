import { ContextMenuCommandBuilder, EmbedBuilder, SlashCommandBuilder, ApplicationCommandType } from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import { Command } from '../../../class/builders';

export default new Command(
  new ContextMenuCommandBuilder().setName('getID').setType(ApplicationCommandType.User).setDMPermission(false),
  async (client, interaction: any) => {
    const { targetId } = interaction;

    const embed = new EmbedBuilder();

    await interaction.reply({
      embeds: [
        embed
          .setTitle(`${interaction.targetUser.username}'s ID`)
          .setDescription(`This user's ID is **${targetId}**.`)
          .setColor("Green")
          .setTimestamp(),
      ],
      ephemeral: true,
    });
  }
);
