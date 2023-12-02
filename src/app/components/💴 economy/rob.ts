import { Message } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { ensureEconomyExists } from '../../../functions/servers';
import model from '../../../models/servers/economy';

module.exports = {
  name: 'rob',
  description: 'Steal money from other server users',
  aliases: ['steal'],
  category: 'economy',
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    if (!args.length)
      return message.reply({
        content: [
          `${emojis.error} Hi ${message.author.username}, I'm sorry but you haven't specified who you want to rob`,
          `**Example:** ${prefix}rob <@user>`,
        ].join('\n'),
      });
    const user =
      message.guild?.members.cache.get(args[0]) ||
      message.mentions.members?.filter((m) => m.guild.id == message.guild?.id).first();
    if (!user)
      return message.reply({
        content: [
          `${emojis.error} Hi ${message.author.username}, I'm sorry but I couldn't find the user you mentioned`,
          `**Example:** ${prefix}rob <@user>`,
        ].join('\n'),
      });

    await ensureEconomyExists(message.author.id);
    let data = await model.findOne({ userID: message.author.id });
    if (!data)
      return message.reply({
        content: [
          `${emojis.error} Hi ${message.author.username}, I'm sorry but you don't have an economy account in this server to play with the government`,
          `Create an account by interacting with: \`economy\``,
        ].join('\n'),
      });

    let user_data = await model.findOne({ userID: user.id });
    if (!user_data)
      return message.reply({
        content: [
          `${emojis.error} Hi ${message.author.username}, I'm sorry but the user you mentioned doesn't have an economy account in this server to play with the government`,
          `Create an account by interacting with: \`economy\``,
        ].join('\n'),
      });

    if (user_data.money < 500)
      return message
        .reply({
          content: [
            `${emojis.error} Hi ${message.author.username}, I'm sorry but the user you mentioned doesn't have enough money to be stolen`,
            `They will be seized soon, so we cannot proceed with the robbery`,
          ].join('\n'),
        })
        .catch(() => {});

    let amount = Math.floor(Math.random() * 400) + 100;
    if (amount > user_data.money)
      return message
        .reply({
          content: [
            `${emojis.error} Hi ${message.author.username}, I'm sorry but the user you mentioned doesn't have enough money to be stolen`,
            `They will be seized soon, so we cannot proceed with the robbery`,
          ].join('\n'),
        })
        .catch(() => {});

    await model.findOneAndUpdate(
      { userID: message.author.id },
      {
        $inc: {
          money: amount,
        },
        rob: Date.now(),
      }
    );

    client.balance(user.id, amount, 'remove', message);
    return message
      .reply({
        content: [
          `${emojis.correct} Hi ${message.author.username}, after a long journey in the city with the police chasing you,`,
          `You have stolen \`${amount} coins\` from \`${user.user.tag}\``,
        ].join('\n'),
      })
      .catch(() => {});
  },
};
