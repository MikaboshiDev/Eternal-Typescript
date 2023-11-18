import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';

module.exports = {
  name: 'google',
  description: 'search on google with the bot',
  aliases: ['google-search', 'search'],
  category: 'public',
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const text1 = args.join(' ');
    const text2 = args.join('+');
    const google = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`;
    if (!text2) {
      return message.channel.send({
        content: [
          `${emojis.error} Please provide a search query to search on google!`,
          `Example: \`google <query>\``,
        ].join('\n'),
      });
    }
    const embed = new EmbedBuilder()
      .setAuthor({
        name: 'Google',
        iconURL: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`,
      })
      .setDescription(
        `**Searched for: **\n${text1} \n\n**Result: **\n[Here's What I found](https://google.com/search?q=${text2})`
      )
      .setThumbnail(google)
      .setColor('Random');
    message.channel.send({ embeds: [embed] });
  },
};
