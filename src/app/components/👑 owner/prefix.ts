import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model_guild from '../../../models/guild';

module.exports = {
  name: 'setprefix',
  description: 'Change the prefix of message commands',
  aliases: ['set-prefix', 'sprefix', 'prefix'],
  owner: true,
  category: 'owner',
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const data = await model_guild.findOne({ id: message.guild?.id });
    const oldPrefix = data?.prefix;
    const value = args[0];
    if (!prefix)
      return message.channel.send({
        content: [`${emojis.error} Please add a prefix for message commands`, `Example: \`${oldPrefix}setprefix !\``].join(
          '\n'
        ),
      });

    if (prefix.length > 5)
      return message.channel.send({
        content: [`${emojis.error} The prefix must be less than 5 characters`, `Example: \`${oldPrefix}setprefix !\``].join(
          '\n'
        ),
      });

    await model_guild.findOneAndUpdate({ id: message.guild?.id }, { prefix: value });
    message.channel.send({
      content: [
        `${emojis.correct} The prefix has been changed to \`${data?.prefix}\``,
        `Example: \`${data?.prefix}help\``,
      ].join('\n'),
    });
  },
};
