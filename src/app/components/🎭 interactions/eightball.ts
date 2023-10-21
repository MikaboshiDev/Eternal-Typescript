import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import neko from 'nekos.life';
const nekoclient = new neko();

module.exports = {
  name: 'eightball',
  description: 'Sends the text and replies with a text as a response to the magic 8Ball and an image as well.',
  aliases: ['8ball', '8b'],
  category: 'interactions',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const text = args.join(' ');
    if (!text)
      return message.channel.send({
        content: [
          `${emojis.error} **${message.author.username}**, You need to provide a text!`,
          `**Usage:** \`${prefix}8ball [text]\``,
        ].join('\n'),
      });

    await nekoclient.eightBall({ text: text }).then((result) => {
      const embed = new EmbedBuilder()
        .setTitle(`8Ball ${message.author.username}`)
        .setColor('Random')
        .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(result.response)
        .setImage(result.url as any);
      message.channel.send({ embeds: [embed] });
    });
  },
};
