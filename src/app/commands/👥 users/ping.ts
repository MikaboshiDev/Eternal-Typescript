import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import user from '../../../models/economy/user';
export default new Command(

  new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!').setDMPermission(false),
  async (client, interaction) => {
    async function db_ping() {
      const start = Date.now();
      await user.findOne({ userId: interaction.user.id });
      return Date.now() - start;
    }

    const embed = new EmbedBuilder()
      .addFields(
        {
          name: 'Api the Discord',
          value: `> \`${client.ws.ping}ms\``,
          inline: true,
        },
        {
          name: 'Database',
          value: `> \`${await db_ping()}ms\``,
          inline: true,
        },
        {
          name: 'Latency',
          value: `> \`${Date.now() - interaction.createdTimestamp}ms\``,
          inline: true,
        }
      )
      .setColor('Random')
      .setFooter({
        text: `The times are in milliseconds (ms)`,
        iconURL: client.user?.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed] });
  }
);
