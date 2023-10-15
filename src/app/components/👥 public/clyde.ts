import { ChannelType, EmbedBuilder, Message, AttachmentBuilder } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { Canvas } from 'canvacord';
module.exports = {
  name: 'clyde',
  description: 'Generate an image of clyde the discord ai',
  aliases: ['clyde-image'],
  category: 'public',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const clydeMessage = args.join(' ');
    if (!clydeMessage)
      return message.reply({
        content: [
          `${emojis.error} The command is missing arguments is missing arguments.`,
          `Usage: \`${prefix}clyde <text>\``,
        ].join('\n'),
      });

    const image = await Canvas.clyde(clydeMessage);
    const attachment = new AttachmentBuilder(image, { name: 'clyde.img' });
    const embed = new EmbedBuilder().setImage('attachment://clyde.png');
    message.channel.send({ files: [attachment], embeds: [embed] });
  },
};
