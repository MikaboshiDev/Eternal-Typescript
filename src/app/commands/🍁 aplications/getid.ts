import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../../../structure/builders';

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
          .setColor('Green')
          .setTimestamp(),
      ],
      ephemeral: true,
    });
  }
);
