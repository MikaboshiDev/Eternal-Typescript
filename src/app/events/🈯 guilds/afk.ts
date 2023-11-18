import { EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { Event } from '../../../class/builders';
import model from '../../../models/servers/afk';

export default new Event('messageCreate', async (message) => {
  try {
    if (!message.channel || !message.guild || message.author.bot) return;
    const data = await model.findOne({ UserID: message.author.id });
    const user = message.member;

    if (data) {
      await model.findOneAndDelete({ UserID: message.author.id });
      await user?.setNickname(user?.displayName.replace('[AFK] ', '')).catch(() => {
        message.channel
          .send({
            content: [
              `${emojis.error} I can't change your nickname to \`${user.displayName}\` because my highest role is lower than the role you mentioned!`,
              `My highest role is and the role you mentioned is.`,
            ].join('\n'),
          })
          .catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
      });

      message.channel
        .send({
          content: [
            `${emojis.correct} Welcome back **${message.author.username}**! I removed your AFK.`,
            `Reason: \`${data.Reason}\``,
          ].join('\n'),
        })
        .then((msg) => setTimeout(() => msg.delete(), 15000))
        .catch((e) => {
          message.reply({
            content: [
              ` ${emojis.error} An error occurred while executing the command, try again later`,
              `plase report this error to the support server.`,
            ].join('\n'),
          });
        });
    }

    const mentionedMember = message.mentions.members?.first();
    if (mentionedMember) {
      const data = await model.findOne({ UserID: mentionedMember.id });
      if (data) {
        const embed = new EmbedBuilder()
          .setColor('Green')
          .setDescription(`**${mentionedMember.user.username}** this AFK! \nReason: ${data.Reason}`);
        message.channel
          .send({ embeds: [embed] })
          .then((msg) => setTimeout(() => msg.delete(), 15000))
          .catch((e) => {
            message.reply({
              content: [
                ` ${emojis.error} An error occurred while executing the command, try again later`,
                `plase report this error to the support server.`,
              ].join('\n'),
            });
          });
      }
    }
  } catch (err) {
    message.channel.send({
      content: [
        ` ${emojis.error} An error occurred while executing the command afk, try again later`,
        `plase report this error to the support server.`,
      ].join('\n'),
    });
  }
});
