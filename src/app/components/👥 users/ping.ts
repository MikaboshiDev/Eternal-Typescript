import { EmbedBuilder, Message } from 'discord.js';
import user from '../../../models/economy/user';
module.exports = {
  name: 'ping',
  description: 'The command to test the bot',
  aliases: ['alias1', 'alias2'],
  async execute(client: any, message: Message, args: string[]) {
    async function db_ping() {
      const start = Date.now();
      await user.findOne({ userId: message.author.id });
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
          value: `> \`${Date.now() - message.createdTimestamp}ms\``,
          inline: true,
        }
      )
      .setColor('Random')
      .setFooter({
        text: `The times are in milliseconds (ms)`,
        iconURL: client.user?.displayAvatarURL(),
      });
    await message.channel.send({ embeds: [embed] });
  },
};
