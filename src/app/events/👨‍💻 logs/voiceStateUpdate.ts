import { EmbedBuilder, TextChannel } from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import emojis from '../../../../config/emojis.json';
import { Event } from '../../../class/builders';
import { client } from '../../../shulker';
import model from '../../../models/guild';
import moment from 'moment';

export default new Event('voiceStateUpdate', async (oldState, newState) => {
  const data = await model.findOne({ guildId: newState.guild.id });
  if (!data) return;

  const log_channel = newState.guild.channels.cache.get(data.channels?.log?.channel as string);
  if (!log_channel) return;
  

  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  if (oldChannel === null && newChannel !== null) {
    const e = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle('Log System - Joined Voice Channel')
      .addFields(
        { name: 'User Joined', value: `${newState.member} (\`${newState.member?.id}\`)`, inline: false },
        { name: 'Channel Joined', value: `${newState.channel} (\`${newChannel.id}\`)`, inline: false },
        {
          name: 'Voice Status',
          value: [
            `**Deaf:** ${newState.deaf ? emojis.correct : emojis.error}`,
            `**Self Deaf:** ${newState.selfDeaf ? emojis.correct : emojis.error}`,
            `**Streaming:** ${newState.streaming ? emojis.correct : emojis.error}`,
            `**Server Mute:** ${newState.serverMute ? emojis.correct : emojis.error}`,
          ].join('\n'),
          inline: false,
        }
      )
      .setThumbnail(client.user?.displayAvatarURL({ forceStatic: true }) as any)
      .setFooter({
        text: `Logs Voice ID: ` + newChannel.id,
        iconURL: client.user?.displayAvatarURL({ forceStatic: true }),
      })
      .setTimestamp();

    (log_channel as TextChannel).send({ embeds: [e] });
  }

  if (newChannel === null && oldChannel !== null) {
    const a = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle('Log System - Left Voice Channel')
      .addFields(
        { name: 'User Left', value: `${oldState.member} (\`${oldState.member?.id}\`)`, inline: false },
        { name: 'Channel Left', value: `${oldChannel} (\`${oldChannel.id}\`)`, inline: false },
        { name: 'Day Left', value: `${moment().format('dddd')} - ${moment().format('LL')}`, inline: false }
      )
      .setThumbnail(client.user?.displayAvatarURL({ forceStatic: true }) as any)
      .setFooter({
        text: `Logs Voice ID: ` + oldChannel.id,
        iconURL: client.user?.displayAvatarURL({ forceStatic: true }),
      })
      .setTimestamp();

    (log_channel as TextChannel).send({ embeds: [a] });
  }

  if (oldChannel !== null && newChannel !== null) {
    if (oldChannel.id !== newChannel.id) {
      const i = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Log System - Voice Channel Update')
        .addFields(
          { name: 'Old State', value: `${oldChannel}\n(\`${oldChannel.id}\`)`, inline: true },
          { name: 'New State', value: `${newChannel}\n(\`${newChannel.id}\`)`, inline: true },
          { name: 'Day', value: `${moment().format('dddd')} - ${moment().format('LL')}`, inline: false },
          {
            name: 'Channel Link',
            value: `[Click Here](https://discord.com/channels/${newState.guild.id}/${newChannel.id})`,
            inline: true,
          },
          { name: 'User', value: `${newState.member}\n(\`${newState.member?.id}\`)`, inline: true }
        )
        .setThumbnail(client.user?.displayAvatarURL({ forceStatic: true }) as any)
        .setFooter({
          text: `Logs Voice ID: ` + newChannel.id,
          iconURL: client.user?.displayAvatarURL({ forceStatic: true }),
        })
        .setTimestamp();

      (log_channel as TextChannel).send({ embeds: [i] });
    }
  }
});
