import { AttachmentBuilder, ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import Canvas from 'canvas';

module.exports = {
  name: 'ship',
  description: 'ship users and see their compatibility level',
  aliases: ['ship-post'],
  category: 'interactions',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const target = message.mentions.users.first();
    const mentiontwo = message.mentions.users.last();
    if (!target)
      return message.channel.send({
        content: [
          ` ${emojis.error} You have to mention someone in the command`,
          `**Example**: \`${prefix}ship @user @user\``,
        ].join('\n'),
      });
    if (!mentiontwo)
      return message.channel.send({
        content: [
          ` ${emojis.error} You have to mention someone in the command`,
          `**Example**: \`${prefix}ship @user @user\``,
        ].join('\n'),
      });
    if (mentiontwo.id == target.id)
      return message.channel.send({
        content: [
          ` ${emojis.error} Not mencioned the same user twice in the command`,
          `**Example**: \`${prefix}ship @user @user\``,
        ].join('\n'),
      });

    const bg = await Canvas.loadImage('https://i.pinimg.com/736x/5c/57/a8/5c57a8967bbd906f6a047e4c01adcc2a.jpg');

    const random = Math.floor(Math.random() * 99) + 1;

    let emoji;
    let color;
    if (random >= 50) {
      emoji = 'https://cdn.discordapp.com/attachments/716216765448978504/858607217728159744/unknown.png';
      color = 'Green';
    } else if (random < 50) {
      emoji = 'https://cdn.discordapp.com/attachments/716216765448978504/858607537238179840/unknown.png';
      color = 'Red';
    }

    ctx.drawImage(bg, -10, -10, canvas.width, canvas.height);

    const fumo = await Canvas.loadImage(emoji as any);
    ctx.drawImage(fumo, 275, 60, 150, 150);

    ctx.beginPath();
    ctx.arc(400 / 2, 250 / 2, 195 / 2, 0, Math.PI * 2);
    ctx.arc(1000 / 2, 250 / 2, 195 / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(target.displayAvatarURL({ extension: 'png' }));
    ctx.drawImage(avatar, 100, 25, 200, 200);

    const TargetAvatar = await Canvas.loadImage(mentiontwo.displayAvatarURL({ extension: 'png' }));
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'fumo.png' });
    return message.channel
      .send({
        content: `**${target.tag}** get together with **${mentiontwo.tag}** a un **${random}%**`,
        files: [attachment],
      })
      .catch((e) => {
        message.reply({
          content: [
            ` ${emojis.error} An error occurred while executing the command, try again later`,
            `plase report this error to the support server.`,
          ].join('\n'),
        });
      });
  },
};
