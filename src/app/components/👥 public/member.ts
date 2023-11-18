import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from 'discord.js';
import moment from 'moment';
import emojis from '../../../../config/json/emojis.json';
module.exports = {
  name: 'member',
  description: 'see the information of the server users or yourself',
  aliases: ['user', 'userinfo'],
  category: 'public',
  cooldown: 20,
  premium: false,
  examples: [`member [user]`, `member @Kurapika`],
  async execute(client: any, message: Message, args: string[]) {
    const member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]) || message.member;
    const member_id = member?.id;
    const guild = message.guild;

    const statuses = {
      online: '🟢',
      idle: '🟠',
      dnd: '🔴',
      offline: '⚫️',
    };

    const embed = new EmbedBuilder()
      .setThumbnail(member?.user.displayAvatarURL({ forceStatic: true }) as any)
      .addFields(
        {
          name: `${emojis.counter} Member`,
          value: [
            `> \`${guild?.members.cache.get(member_id as any)?.user.username}\``,
            `> \`${guild?.nameAcronym ? guild?.nameAcronym : guild?.name}\``,
          ].join('\n'),
          inline: true,
        },
        {
          name: `${emojis.bank} Id`,
          value: [`> ${member?.user.tag}`, `> \`${member_id}\``].join('\n'),
          inline: true,
        },
        {
          name: `${emojis.timer} Dates`,
          value: [
            `> **Created At:** ${moment(member?.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`,
            `> **Joined At:** ${moment(member?.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}`,
          ].join('\n'),
          inline: false,
        },
        {
          name: `${emojis.question} Status`,
          value: `> ${
            member?.presence?.status && member?.presence?.status !== 'invisible'
              ? statuses[member?.presence?.status as keyof typeof statuses] + ' '
              : ''
          }${member?.presence?.status ?? 'offline'}`,
          inline: true,
        },
        { name: `${emojis.ranking} Highest Role`, value: `> ${member?.roles.highest}`, inline: true },
        {
          name: `${emojis.star} Booster`,
          value: `> ${member?.premiumSince ? 'Yes since ' + member?.premiumSince : 'No'}`,
          inline: true,
        },
        {
          name: `${emojis.wave} Roles`,
          value: `> ${member?.roles.cache.map((r: any) => r !== '@everyone' && r).join(', ')}`,
          inline: false,
        },
        {
          name: `${emojis.shield} Permissions`,
          value: `> ${member?.permissions
            .toArray()
            .map((p: any) => `\`${p}\``)
            .join(', ')}`,
          inline: false,
        }
      );

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Avatar')
        .setStyle(ButtonStyle.Link)
        .setURL(member?.user.displayAvatarURL({ forceStatic: true, size: 4096 }) as any)
    );

    message.channel.send({ embeds: [embed], components: [button as any] });
  },
};
