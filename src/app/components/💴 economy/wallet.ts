import canvas, { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/economy';

module.exports = {
  name: 'wallet',
  description: 'Check your wallet balance',
  aliases: ['bal', 'balance', 'money', 'cash'],
  category: 'economy',
  premium: false,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const member = message.mentions.users.first() || message.author;
    if (member.bot)
      return message.reply({
        content: [
          `${emojis.error} You can't view the balance of a bot.`,
          `**Usage Example:** \`${prefix}balance @${message.author.username}\``,
        ].join('\n'),
      });

    const data = await model.findOne({ userID: member.id });
    if (!data)
      return message.reply({
        content: [
          `${emojis.error} The user doesn't have an economy profile in the server, so they cannot place bets.`,
          `**Usage Example:** \`${prefix}bet 100\``,
        ].join('\n'),
      });

    const canvas = createCanvas(500, 300);
    const context = canvas.getContext('2d');

    const background = await loadImage(
      'https://cdn.discordapp.com/attachments/1134529955330535487/1141970857703526430/card_economia.jpg'
    );
    const messageMember = await loadImage(message.author.displayAvatarURL({ extension: 'png' }));

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    (context.font = '20px Marlin Geo Black'), (context.fillStyle = '#ffffff');
    context.fillText(`\n${member.username} General Account`, canvas.width / 4.1, canvas.height / 7);

    (context.font = '20px Marlin Geo Black'), (context.fillStyle = '#ffffff');
    context.fillText(`Money: ${data.money} Coins`, canvas.width / 2.1, canvas.height / 1.95);

    (context.font = '20px Marlin Geo Black'), (context.fillStyle = '#ffffff');
    context.fillText(`Bank: ${data.bank} Coins`, canvas.width / 2.1, canvas.height / 1.7);

    (context.font = '30px Marlin Geo Black'), (context.fillStyle = '#ffffff');
    context.fillText(`${member.id}`, canvas.width / 23, canvas.height / 1.3);
    context.save();

    roundedImage(context, 23, 20, 90, 90, 25);
    context.clip();

    context.drawImage(messageMember, 23, 20, 90, 90);
    context.closePath();

    context.clip();
    function roundedImage(
      ctx: canvas.CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'unkown.png' });
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Economy Balance')
          .setDescription(`Hey! ${member.username} the user's account is below.`)
          .setImage('attachment://unkown.png'),
      ],
      files: [attachment],
    });
  },
};
