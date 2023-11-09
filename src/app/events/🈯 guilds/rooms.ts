import { ChannelType } from 'discord.js';
import { Event } from '../../../class/builders';
import { client } from '../../../shulker';
import { logWithLabel } from '../../../utils/console';

export default new Event('voiceStateUpdate', async (oldState, newState) => {
  const { member, guild } = newState;
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;
  const joinToCreate = process.env.ROOMID!;

  if (oldChannel !== newChannel && newChannel && newChannel.id === joinToCreate) {
    const voiceChannel = await guild.channels.create({
      name: '💫' + '︰' + member?.user.username + member?.user.discriminator,
      type: ChannelType.GuildVoice,
      parent: newChannel.parent,
    });
    client.voiceGenerator.set(member?.id, voiceChannel.id);
    return setTimeout(() => member?.voice.setChannel(voiceChannel), 500);
  }
  const ownedChannel = client.voiceGenerator.get(member?.id);
  if (ownedChannel && oldChannel?.id == ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
    client.voiceGenerator.set(member?.id, null);
    oldChannel.delete().catch(() => {
      logWithLabel('error', `Failed to delete channel ${oldChannel.name}`);
    });
  }
});
