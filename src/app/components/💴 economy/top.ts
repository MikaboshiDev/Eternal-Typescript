import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/economy';
module.exports = {
  name: 'top',
  description: 'Shows the richest users',
  aliases: ['leaderboard', 'lb'],
  category: 'economy',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const data = await model.find();
    if (!message.guild) return;

    await message.guild.members.fetch();
    const members = message.guild.members.cache.filter((member) => !member.user.bot);
    const users = data.filter((user) => members.has(user.userID));
    const sorted = users.sort((a, b) => b.money - a.money);

    const embed = new EmbedBuilder()
      .setTitle(`${emojis.money} ${message.guild.name}\'s Leaderboard`)
      .setColor('Random')
      .setTimestamp();

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('next').setLabel('Next').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('previous').setLabel('Previous').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('first').setLabel('First').setStyle(ButtonStyle.Primary)
    );

    embed.setDescription(
      sorted
        .slice(0, 10)
        .map((user, index) => `${index + 1}. <@${user.userID}> - ${user.money.toLocaleString()} ${emojis.coin}`)
        .join('\n')
    );

    const msg = await message.reply({ embeds: [embed], components: [button as any] });
    const filter = (i: any) => i.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 60000 });

    let page = 0;
    collector.on('collect', async (i: any) => {
      if (i.customId === 'next') {
        page++;
        if (page > Math.ceil(sorted.length / 10) - 1) page = 0;
      } else if (i.customId === 'previous') {
        page--;
        if (page < 0) page = Math.ceil(sorted.length / 10) - 1;
      } else if (i.customId === 'first') {
        page = 0;
      }

      const embed = new EmbedBuilder()
        .setTitle(`${emojis.money} ${message.guild?.name}\'s Leaderboard`)
        .setColor('Random')
        .setTimestamp();

      embed.setDescription(
        sorted
          .slice(page * 10, page * 10 + 10)
          .map((user, index) => `${index + 1}. <@${user.userID}> - ${user.money.toLocaleString()} ${emojis.coin}`)
          .join('\n')
      );

      await i.update({ embeds: [embed] });
    });
  },
};
