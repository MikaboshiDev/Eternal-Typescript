import { EmbedBuilder, TextChannel } from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import emojis from '../../../../config/emojis.json';
import { Event } from '../../../class/builders';
import { client } from '../../../shulker';

export default new Event('inviteCreate', async (invite) => {
  const log_channel = client.channels.cache.get(process.env.log_channel as string);
  if (!invite.guild) return;
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
