import emojis from '../../../../config/emojis.json';
import { EmbedBuilder, Message } from 'discord.js';
import { STATUS_CODES } from 'http';

module.exports = {
  name: 'httpstatus',
  category: 'premium',
  aliases: ['httpstatuscode', 'httpstatuscodes', 'httpstatuscodes', 'httpstatuscode'],
  cooldown: 4,
  examples: [`httpsstatus [status]`, `httpsstatus [params] 200`],
  description: 'Show httpstatus with a meme image and description',
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const status = args[0];
      if (!status)
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('Red')
              .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
              .setDescription(
                [
                  `${emojis.error} You did not provide a status code to lookup for a meme!`,
                  `Usage: \`${prefix}httpstatus <status>\``,
                ].join('\n')
              ),
          ],
        });

      if (status !== '599' && !STATUS_CODES[status])
        return message.reply({
          content: [
            `${emojis.error} The status code is invalid or not provided (100-599) or (599)`,
            `Usage: \`${prefix}httpstatus <status>\``,
          ].join('\n'),
        });

      return message.reply({
        content: `https://http.cat/${status}.jpg`,
      });
    } catch (e) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setFooter({ text: `Requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTitle(`ERROR An error occurred`)
            .setDescription(`The error was reported to the Support Server`),
        ],
      });
    }
  },
};
