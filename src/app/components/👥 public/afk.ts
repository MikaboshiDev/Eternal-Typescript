import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/afk';

module.exports = {
  name: 'afk',
  description: 'Set your AFK status',
  aliases: ['set-afk'],
  category: 'public',
  premium: false,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const user = message.member;
    const role = message.mentions.roles.first();
    if (role)
      return message.channel.send({
        content: [
          `${emojis.error} You can't mention roles when putting yourself in this afk`,
          `please try again without mentioning any roles.`,
        ].join('\n'),
      });

    const reason = args.join(' ') || 'No reason provided';
    const data = await model.findOne({ UserID: message.author.id });
    if (data)
      return message.channel
        .send({
          content: [`${emojis.error} You are already AFK with the reason:`, `\`${data.Reason}\``].join('\n'),
        })
        .then((msg) => setTimeout(() => msg.delete(), 15000));

    await new model({ UserID: message.author.id, Reason: reason }).save();
    user?.setNickname(`[AFK] ${user?.displayName}`).catch(() => {
      message.channel.send({
        content: [
          `${emojis.error} I can't change your nickname to \`${user?.displayName}\` because my highest role is lower than the role you mentioned!`,
          `My highest role is and the role you mentioned is ${role}`,
        ].join('\n'),
      });
    });

    const embed = new EmbedBuilder()
      .setTitle('Now youre AFK!')
      .setDescription(`Reason: \`${reason}\``)
      .setColor('Random');

    message.channel.send({ embeds: [embed] }).then((msg) => setTimeout(() => msg.delete(), 15000));
  },
};
