import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import neko from 'nekos.life';

module.exports = {
  name: 'emotions',
  description: 'The list commands of Emotions',
  aliases: ['emotion'],
  category: 'interactions',
  premium: false,
  cooldown: 5000,
  examples: ['emotions baka', 'emotions eightball', 'emotions slap', 'emotions kiss'],
  subcommands: [
    'emotions baka [user]: Baka someone',
    'emotions eightball [text]: 8Ball',
    'emotions slap [user]: Slap someone',
    'emotions kiss [user]: Kiss someone',
    'emotions tickle [user]: Tickle someone',
  ],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const nekoclient = new neko();
    const subcommand = args[0];
    switch (subcommand) {
      case 'baka':
        {
          const user = message.mentions.users.first() || message.author;
          const embed = new EmbedBuilder()
            .setTitle('Emotions Commands')
            .setDescription(`you are an idiot ${user}`)
            .setImage((await nekoclient.baka()).url);
          message.channel.send({ embeds: [embed] });
        }
        break;
      case 'eightball':
        {
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
              .setFooter({
                text: `Requested by ${message.author.username}`,
                iconURL: message.author.displayAvatarURL(),
              })
              .setDescription(result.response)
              .setImage(result.url as any);
            message.channel.send({ embeds: [embed] });
          });
        }
        break;
      case 'slap':
        {
          const user = message.mentions.users.first() || message.author;
          const embed = new EmbedBuilder()
            .setTitle('Emotions Commands')
            .setDescription(`${message.author} A slapped *${user}* hard`)
            .setImage((await nekoclient.slap()).url);
          message.channel.send({ embeds: [embed] });
        }
        break;
      case 'kiss':
        {
          const user = message.mentions.users.first() || message.author;
          const embed = new EmbedBuilder()
            .setTitle('Emotions Commands')
            .setDescription(`${message.author} A kissed *${user}*`)
            .setImage((await nekoclient.kiss()).url);
          message.channel.send({ embeds: [embed] });
        }
        break;
      case 'tickle': {
        const user = message.mentions.users.first() || message.author;
        const embed = new EmbedBuilder()
          .setTitle('Emotions Commands')
          .setDescription(`${message.author} He is tickling *${user}*`)
          .setImage((await nekoclient.kiss()).url);
        message.channel.send({ embeds: [embed] });
      }
    }
  },
};
