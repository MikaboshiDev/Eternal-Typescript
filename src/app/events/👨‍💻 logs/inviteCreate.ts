import { EmbedBuilder, Guild, TextChannel } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { Event } from '../../../class/builders';
import model from '../../../models/guild';
import { client } from '../../../shulker';

export default new Event('inviteCreate', async (invite) => {
  if (!invite.guild) return;
  const data = await model.findOne({ guildId: invite.guild.id });
  const log_channel = (invite.guild as Guild).channels.cache.get(data?.channels?.log?.channel as string);
  if (!log_channel) return;

  const embed = new EmbedBuilder()
    .setColor('Blurple')
    .setTitle('Log System - Invite Created')
    .addFields(
      { name: `Invite Link`, value: `> ${invite.code}`, inline: true },
      {
        name: `Invite Created`,
        value: `> <t:${Math.floor((invite.createdTimestamp ?? Date.now()) / 1000)}:R>`,
        inline: true,
      },
      {
        name: `Invite Expires`,
        value: `> ${
          invite.expiresTimestamp
            ? `<t:${Math.floor(invite.expiresTimestamp / 1000)}:R> by User: ${
                invite.inviter?.tag ?? ` ${emojis.error} Unknown`
              }`
            : 'Never'
        }`,
        inline: true,
      }
    )
    .setThumbnail(client.user?.displayAvatarURL({ forceStatic: true }) as string)
    .setFooter({ text: `Server Logs: ${invite.guild?.name}`, iconURL: invite.guild?.iconURL() as any })
    .setTimestamp();

  (log_channel as TextChannel).send({ embeds: [embed] });
});
