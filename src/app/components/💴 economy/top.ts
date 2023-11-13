import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
  GuildMember,
  Message,
} from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/economy';
import { pagination } from '../../../functions/tools/pagination';

const medallas: { [key: number]: string | undefined } = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

module.exports = {
  name: 'top',
  description: 'Shows the richest users',
  aliases: ['leaderboard', 'lb'],
  category: 'economy',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const total = await model.find();
    await message.guild?.members.fetch();
    const ordenado = total
      .filter((member: any) => message.guild?.members.cache.get(member.userID))
      .sort((a, b) => Number(b.money + b.bank - (a.money + a.bank)));

    const texto = ordenado.map((miembro, index) => {
      const guildMember = message.guild?.members.cache.get(miembro.userID);

      if (guildMember) {
        const medalla = medallas[index + 1];

        return `${medalla ?? ''} \`${index + 1}\` - <@${miembro.userID}> *\`${guildMember.user.tag}\`*\n**Money:** \`${
          miembro.money
        }\` 🪙\n**Bank:** \`${miembro.bank}\` 🏦\n\n`;
      } else {
        return '';
      }
    });

    pagination(client, message, texto, '💸 ECONOMY LEADERBOARD 💸');
  },
};
