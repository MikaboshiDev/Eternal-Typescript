import { getBalance } from '../../../functions/modules/economy_modules';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';

export default new Command(
  new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Returns the balance of a user')
    .addUserOption((option) => option.setName('user').setDescription('Select a user to get the balance of')),
  async (client, interaction) => {
    const user = interaction.options.getUser('user') || interaction.user;
    const guildId = interaction.guild?.id!;
    const dbBalance = await getBalance(user.id, guildId);
    if (!dbBalance) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `Oops! ${user.tag} does not have a balance yet. A reason for this is they might have not talked in this server yet or the admins removed his balance!`
          ),
        ],
        ephemeral: true,
      });
    }

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${user.username}'s balance`)
          .setDescription(`**User has $${dbBalance.balance}**`)
          .setFooter({
            text: user.tag,
            iconURL: user.displayAvatarURL(),
          })
          .setColor('Random')
          .setTimestamp(),
      ],
    });
  }
);
