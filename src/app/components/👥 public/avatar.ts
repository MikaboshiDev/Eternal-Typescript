import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from 'discord.js';

module.exports = {
  name: 'avatar',
  description: 'Get a user avatar image',
  aliases: ['av', 'pfp'],
  category: 'public',
  premium: false,
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let png = user.avatarURL({ extension: 'png', forceStatic: true, size: 1024 });
    let jpg = user.avatarURL({ extension: 'jpg', forceStatic: true, size: 1024 });
    let webp = user.avatarURL({ extension: 'webp', forceStatic: true, size: 1024 });

    const avatar = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL({ forceStatic: true }),
      })
      .setFooter({
        text: `Avatar requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ forceStatic: true }),
      })
      .setImage(user.displayAvatarURL({ extension: 'png', forceStatic: true, size: 1024 }))
      .setTimestamp()
      .setColor(client.color);

    message.channel
      .send({
        embeds: [avatar],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('PNG').setEmoji('📸').setURL(png),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('JPG').setEmoji('📸').setURL(jpg),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('WEBP').setEmoji('📸').setURL(webp)
          ) as any,
        ],
      })
      .catch(() => {});
  },
};
