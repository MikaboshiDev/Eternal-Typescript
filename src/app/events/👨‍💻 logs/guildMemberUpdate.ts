import { EmbedBuilder, TextChannel } from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import { Event } from '../../../class/builders';
import { client } from '../../../shulker';

export default new Event('guildMemberUpdate', async (oldMember, newMember) => {
  const log_channel = client.channels.cache.get(process.env.log_channel as string);
  if (!log_channel) return;

  if (oldMember.nickname !== newMember.nickname) {
    const embed = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle('Log System - Member Updated')
      .addFields(
        { name: 'Member', value: `> ${newMember.user.tag} (\`${newMember.user.id}\`)`, inline: true },
        {
          name: 'Fecha',
          value: `> <t:${Math.floor((newMember.joinedTimestamp ?? Date.now()) / 1000)}:R>`,
          inline: true,
        },
        {
          name: 'Nickname',
          value: `> ${oldMember.nickname || 'No Nickname'} => ${newMember.nickname || 'No Nickname'}`,
        }
      )
      .setThumbnail(newMember.user.displayAvatarURL({ forceStatic: true }))
      .setFooter({ text: `Server Logs: ${newMember.guild.name}`, iconURL: newMember.guild.iconURL() as any })
      .setTimestamp();

    (log_channel as TextChannel).send({ embeds: [embed] });
  }

  if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
    const embed = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle('Log System - Member Updated')
      .addFields(
        { name: 'Member', value: `> ${newMember.user.tag} (\`${newMember.user.id}\`)`, inline: true },
        { name: 'Fecha', value: `> <t:${Math.floor(newMember.joinedTimestamp ?? Date.now() / 1000)}:R>`, inline: true },
        {
          name: 'Roles Added',
          value: `> ${
            newMember.roles.cache
              .filter((r) => !oldMember.roles.cache.has(r.id))
              .map((r) => r)
              .join(' ') || 'No Roles Added'
          }`,
        }
      )
      .setThumbnail(newMember.user.displayAvatarURL({ forceStatic: true }))
      .setFooter({ text: `Server Logs: ${newMember.guild.name}`, iconURL: newMember.guild.iconURL() as any })
      .setTimestamp();

    (log_channel as TextChannel).send({ embeds: [embed] });
  }
});
