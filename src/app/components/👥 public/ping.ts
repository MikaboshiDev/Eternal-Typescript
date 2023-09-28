import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from 'discord.js';
import user from '../../../models/economy/user';
module.exports = {
  name: 'ping',
  description: 'Ping command for discord api, database and transparency',
  aliases: ['pong', 'pp'],
  category: 'public',
  cooldown: 5000,
  premium: false,
  examples: [`ping`],
  async execute(client: any, message: Message, args: string[]) {
    async function db_ping() {
      const start = Date.now();
      await user.findOne({ userId: message.author.id });
      return Date.now() - start;
    }

    const embed = new EmbedBuilder()
      .addFields(
        { name: 'Api the Discord', value: `> \`${client.ws.ping}ms\``, inline: true },
        { name: 'Database', value: `> \`${await db_ping()}ms\``, inline: true },
        { name: 'Latency', value: `> \`${Date.now() - message.createdTimestamp}ms\``, inline: true }
      )
      .setColor('Random')
      .setTimestamp()
      .setFooter({
        text: `The times are in milliseconds (ms)`,
        iconURL: client.user?.displayAvatarURL(),
      });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('public_ping').setLabel('Ping').setStyle(ButtonStyle.Primary).setEmoji('🏓')
    );
    
    await message.channel.send({ embeds: [embed], components: [button as any] });
  },
};
