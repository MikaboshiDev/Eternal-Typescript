import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/economy';

module.exports = {
  name: 'withdraw',
  description: 'The bank will give you the money you have in your bank account',
  aliases: ['with'],
  category: 'economy',
  premium: false,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const data = await model.findOne({ userID: message.author.id });
      if (!data)
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: `Server economy error`,
                iconURL: message.author.avatarURL({ forceStatic: true }) as any,
              })
              .setFooter({
                text: `Server economy error`,
                iconURL: message.author.avatarURL({ forceStatic: true }) as any,
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

      let cantidad = parseInt(args[0]);
      if (['todo', 'all-in', 'all'].includes(args[0])) {
        cantidad = data.bank;
      } else {
        if (isNaN(cantidad) || cantidad <= 0 || cantidad % 1 != 0)
          return message.reply({
            content: [
              `${emojis.error} Hello ${message.author.username} sorry but you have not specified a valid amount to withdraw`,
              `**Example:** ${prefix}get 100`,
            ].join('\n'),
          });

        if (cantidad > data.bank)
          return message.reply({
            content: [
              `${emojis.error} Hi ${message.author.username} sorry but you don't have that much money in the bank to withdraw`,
              `He Play a little with me and earn money with \`economy\``,
            ].join('\n'),
          });
      }
      await model.findOneAndUpdate(
        { userID: message.author.id },
        {
          $inc: {
            bank: -cantidad,
            money: cantidad,
          },
        }
      );
      return message.reply({
        content: [
          `${emojis.correct} Hi ${message.author.username} the paperwork with the bank is finally done today`,
          `You have withdrawn \`${cantidad} coins\` from your bank!`,
        ].join('\n'),
      });
    } catch (e) {
      message.channel.send({
        content: [
          `${emojis.error} An error has occurred while executing the command, please try again later`,
          `**Error Time:** ${Date.now() - message.createdTimestamp}ms`,
        ].join('\n'),
      });
    }
  },
};
