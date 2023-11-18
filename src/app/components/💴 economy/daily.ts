import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import model from '../../../models/servers/economy';

module.exports = {
  name: 'daily',
  description: 'The daily command can be used to get your daily money.',
  aliases: ['day'],
  category: 'economy',
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const data = await model.findOne({ userID: message.author.id });
    const recompensa = 1200;
    if (!data)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: `Server economy error`,
              iconURL: message.author.avatarURL({ forceStatic: true }) as string,
            })
            .setFooter({
              text: `Server economy error`,
              iconURL: message.author.avatarURL({ forceStatic: true }) as string,
            })
            .setDescription(
              [
                `${emojis.error} Hello **${message.author.username}** I'm sorry but you don't have economy system created in my database`,
                `please try again later or contact server support`,
              ].join('\n')
            )
            .setColor('Red')
            .setTimestamp(),
        ],
      });

    let posibilidades = ['win', 'lose'];
    let resultado = posibilidades[Math.floor(Math.random() * posibilidades.length)];

    if (resultado === 'win') {
      client.balance(message.author.id, recompensa, 'add', message);
      return message
        .reply({
          content: [
            `${emojis.correct} Hi ${message.author.username}, you have claimed your daily reward of \`${recompensa} coins\`!`,
            `Thank you for trusting us, come back later!`,
          ].join('\n'),
        })
        .catch(() => {});
    } else if (resultado === 'lose') {
      message.reply({
        content: [
          `${emojis.error} Hi, I'm sorry but you just missed the chance to win your daily reward in the economy system`,
          `Come back another day, maybe you'll have better luck next time you try`,
        ].join('\n'),
      });
    }
  },
};
