import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import user from '../../../models/economy/user';

module.exports = {
  id: 'public_ping',
  async execute(interaction: ChatInputCommandInteraction, client: any) {
    async function db_ping() {
      const start = Date.now();
      await user.findOne({ userId: interaction.user.id });
      return Date.now() - start;
    }

    const embed = new EmbedBuilder()
      .addFields(
        { name: 'Api the Discord', value: `> \`${client.ws.ping}ms\``, inline: true },
        { name: 'Database', value: `> \`${await db_ping()}ms\``, inline: true },
        { name: 'Latency', value: `> \`${Date.now() - interaction.createdTimestamp}ms\``, inline: true }
      )
      .setColor('Random')
      .setTimestamp()
      .setFooter({
        text: `The times are in milliseconds (ms)`,
        iconURL: client.user?.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
