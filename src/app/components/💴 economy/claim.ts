import { Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import keygen from '../../../models/premium/clave';

module.exports = {
  name: 'claim',
  description: 'Used to claim your daily reward',
  aliases: ['recompensa', 'recompensas', 'recompensar'],
  category: 'economy',
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const key = await keygen.findOne({ clave: args[0] });
      if (key) {
        if (key.activated) {
          return message.reply({
            content: [
              `${emojis.error} The key you mentioned has already been used by another user in the Discord server!`,
              `If you believe this is an error, please contact the Discord server staff.`,
            ].join('\n'),
          });
        } else {
          key.activated = true;
          key.save();

          client.balance(message.author.id, key.money, 'add', message);
          return message.reply({
            content: [
              `${emojis.correct} The rewards from the key \`${args[0]}\` have been delivered to your account! Thank you for participating.`,
              `Remember, you can claim more keys in the <#1071874372337401949> channel.`,
            ].join('\n'),
          });
        }
      } else {
        return message.reply({
          content: [
            `${emojis.error} The key you mentioned does not exist in the Discord reward keys database!`,
            `If you believe this is an error, please contact the Discord server staff.`,
          ].join('\n'),
        });
      }
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
