import { EmbedBuilder, TextChannel } from 'discord.js';
import model from '../../../models/guild';
import { client } from '../../../shulker';
import { Event } from '../../../structure/builders';

export default new Event('guildMemberRemove', async (member) => {
  const data = await model.findOne({ guildId: member.guild.id });
  if (!data) return;

  const log_channel = member.guild.channels.cache.get(data.channels?.log?.channel as string);
  if (!log_channel) return;

  const embed = new EmbedBuilder()
    .setColor('Blurple')
    .setTitle('Log System - Member Left')
    .addFields({
      name: `Member`,
      value: `> ${member.user.tag} (\`${member.user.id}\`)\n> \`${member.user.username}\``,
      inline: true,
    })
    .setThumbnail(
      member.user.avatarURL({ forceStatic: true }) || (client.user?.avatarURL({ forceStatic: true }) as any)
    )
    .setFooter({ text: `Server Logs: ${member.guild.name}`, iconURL: member.guild.iconURL() as any })
    .setTimestamp();
  (log_channel as TextChannel).send({ embeds: [embed] });
});
