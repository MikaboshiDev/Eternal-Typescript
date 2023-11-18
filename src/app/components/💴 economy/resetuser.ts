import { Message } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import model from '../../../models/servers/economy';

module.exports = {
  name: 'resetuser',
  description: 'Reset the economic status of the discord server users',
  aliases: ['reset-user'],
  category: 'economy',
  owner: true,
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const user = message.mentions.users.first() || message.author;
    if (!user)
      return message.channel.send({
        content: [
          `${emojis.error} The user was not found in the database of the bot please try again later!`,
          `> Example: \`${prefix}resetuser @user\``,
        ].join('\n'),
      });

    const data = await model.findOne({ userID: user.id });
    if (!data)
      return message.channel.send({
        content: [
          `${emojis.error} The user was not found in the database of the bot please try again later!`,
          `> Example: \`${prefix}resetuser @user\``,
        ].join('\n'),
      });

    await model.findOneAndDelete({ userID: user.id });
    message.channel.send({
      content: [
        `${emojis.correct} The user has been reseted in the database of the bot successfully!`,
        `> User: ${user.tag} (\`${user.id}\`)`,
        `> Count of data delete: \`1\` archive`,
      ].join('\n'),
    });
  },
};
