import emojis from '../../../config/emojis.json';
import model from '../../models/servers/economy';
import { EmbedBuilder, Message } from 'discord.js';

export async function economyData(client: any, message: any, user: any) {
  let data = await model.findOne({ userID: user.id });

  if (!data) {
    return sendErrorMessage(
      message,
      user,
      [
        `${emojis.error} Hello **${user.username}** I'm sorry but you don't have economy system in my database`,
        `please try again later or contact server support`,
      ].join('\n')
    );
  }

  if (data.money === 0 || data.money === null || data.money === undefined) {
    return sendErrorMessage(
      message,
      user,
      [
        `${emojis.error} Hello **${user.username}** I'm sorry but you don't have much money outside of the bank`,
        `I recommend you work or claim rewards to get money and be able to play`,
      ].join('\n')
    );
  }

  if (data.money < 0) {
    return sendErrorMessage(
      message,
      user,
      [
        `${emojis.error} Hello **${user.username}** I'm sorry but you don't have much money outside of the bank`,
        `I recommend you work or claim rewards to get money and be able to play`,
      ].join('\n')
    );
  }
}

function sendErrorMessage(message: any, user: any, description: any) {
  return message.channel.send({
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: `Server economy error`, iconURL: user.avatarURL({ forceStatic: true }) })
        .setFooter({ text: `Server economy error`, iconURL: user.avatarURL({ forceStatic: true }) })
        .setDescription(description)
        .setColor('Red')
        .setTimestamp(),
    ],
  });
}
