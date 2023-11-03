import { ChannelType, EmbedBuilder, Message, Webhook } from 'discord.js';
import emojis from '../../../../config/emojis.json';

module.exports = {
  name: 'sudo',
  description: 'Send a message through webhooks in the Discord server',
  botpermissions: ["ManageChannels"],
  aliases: ['hack'],
  category: 'public',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    let user = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]);
    if (!message.guild || !message.channel || !message.partial) return;
    if (message.channel.type !== ChannelType.GuildText) return;

    if (!user)
      return message.channel
        .send({
          content: [
            `${emojis.error} Please mention the user to whom we will send the message`,
            `**Interaction Time:** \`${new Date().toLocaleTimeString()}\``,
          ].join('\n'),
        })
        .catch(() => {});

    let msg = args.slice(1).join(' ');
    if (!msg)
      return message.channel
        .send({
          content: [
            `${emojis.error} Please enter the message you want to send`,
            `**Interaction Time:** \`${new Date().toLocaleTimeString()}\``,
          ].join('\n'),
        })
        .catch(() => {});

    message.delete();
    const webhook = await message.channel
      .createWebhook({
        name: user.displayName,
        avatar: user.user.displayAvatarURL({ forceStatic: true }),
      })
      .catch(() => {});

    await (webhook as Webhook)
      .send(msg)
      .then(() => {
        (webhook as Webhook).delete();
      })
      .catch(() => {});
  },
};
