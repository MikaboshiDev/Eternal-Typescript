import axios from 'axios';
import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'shorterurl',
  description: 'Get url images from the shorter api',
  aliases: ['shorter-url', 'short-url', 'shorter'],
  category: 'utility',
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const embed = new EmbedBuilder();
    const destination = args[0];

    try {
      const url = `https://is.gd/create.php?format=simple&url=${encodeURI(destination)}`;
      const response = await axios.get(url);
      const responseData: string = response.data;
      embed.setTitle('Converted!').setDescription(`URL: ${responseData}\nDestination: \`${destination}\``);
      await message.reply({
        embeds: [embed],
      });
    } catch {
      logWithLabel('error', `Error while trying to convert the url ${destination}`);
      message.channel.send({
        content: [
          `${emojis.error} Error while trying to convert the url ${destination}`,
          `use \`${prefix}shorterurl <url>\` to convert a url`,
        ].join('\n'),
      });
    }
  },
};
