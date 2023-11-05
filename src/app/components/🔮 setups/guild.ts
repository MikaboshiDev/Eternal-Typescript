import { Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import guild from '../../../models/guild';
module.exports = {
  name: 'guild',
  description: 'Configure the setups related to server interaction',
  aliases: ['server', 'guilds', 'servers'],
  category: 'setups',
  premium: false,
  cooldown: 20,
  permissions: ['Administrator'],
  example: [`guild [subcommand] [properties]`, `guild [command]`],
  subcommands: [
    'guild chatbot <enable/disable> [#channel]',
    'guild update <enable/disable> [#channel]',
    `guild logs <enable/disable> [#channel]`,
  ],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'chatbot':
        {
          const enabled = args[1];
          if (!enabled)
            return message.channel.send({
              content: [
                `${emojis.error} Please specify if you want to enable or disable the chatbot.`,
                `**Example:** \`${prefix}guild chatbot enable\``,
              ].join('\n'),
            });

          if (enabled.toLowerCase() !== 'enable' && enabled.toLowerCase() !== 'disable')
            return message.channel.send({
              content: [
                `${emojis.error} Please specify if you want to enable or disable the chatbot.`,
                `**Example:** \`${prefix}guild chatbot enable\``,
              ].join('\n'),
            });

          const data = await guild.findOne({ id: message.guild?.id });
          if (!data) return message.channel.send({ content: `${emojis.error} Unable to find the server data.` });

          switch (enabled.toLowerCase()) {
            case 'enable':
              {
                if (data.channels?.chatbot?.enabled === true)
                  return message.channel.send({
                    content: `${emojis.error} The chatbot is already enabled.`,
                  });

                const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[2]);
                if (!channel)
                  return message.channel.send({
                    content: `${emojis.error} Please mention the channel where you want to enable the chatbot.`,
                  });

                await guild.findOneAndUpdate(
                  { id: message.guild?.id },
                  { channels: { chatbot: { enabled: true, channel: channel.id } } }
                );

                message.channel.send({
                  content: [
                    `${emojis.correct} The chatbot has been enabled in the channel ${channel}.`,
                    `**Example:** \`${prefix}guild chatbot disable\``,
                  ].join('\n'),
                });
              }
              break;
            case 'disable':
              {
                if (data.channels?.chatbot?.enabled === false)
                  return message.channel.send({ content: `${emojis.error} The chatbot is already disabled.` });

                await guild.findOneAndUpdate(
                  { id: message.guild?.id },
                  { channels: { chatbot: { enabled: false, channel: null } } }
                );

                message.channel.send({
                  content: [
                    `${emojis.correct} The chatbot has been disabled in the server.`,
                    `**Example:** \`${prefix}guild chatbot enable #channel\``,
                  ].join('\n'),
                });
              }
              break;
          }
        }
        break;
      case 'update':
        {
          const enabled = args[1];
          if (!enabled)
            return message.channel.send({
              content: [
                `${emojis.error} Please specify if you want to enable or disable the channel updates.`,
                `**Example:** \`${prefix}guild update enable\``,
              ].join('\n'),
            });

          if (enabled.toLowerCase() !== 'enable' && enabled.toLowerCase() !== 'disable')
            return message.channel.send({
              content: [
                `${emojis.error} Please specify if you want to enable or disable the channel updates.`,
                `**Example:** \`${prefix}guild update enable\``,
              ].join('\n'),
            });

          const data = await guild.findOne({ id: message.guild?.id });
          if (!data) return message.channel.send({ content: `${emojis.error} Unable to find the server data.` });

          switch (enabled.toLowerCase()) {
            case 'enable':
              {
                if (data.channels?.updates?.enabled === true)
                  return message.channel.send({
                    content: `${emojis.error} The channel updates are already enabled.`,
                  });

                const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[2]);
                if (!channel)
                  return message.channel.send({
                    content: `${emojis.error} Please mention the channel where you want to enable the channel updates.`,
                  });

                await guild.findOneAndUpdate(
                  { id: message.guild?.id },
                  { channels: { updates: { enabled: true, channel: channel.id } } }
                );

                message.channel.send({
                  content: [
                    `${emojis.correct} The channel updates have been enabled in the channel ${channel}.`,
                    `**Example:** \`${prefix}guild update disable\``,
                  ].join('\n'),
                });
              }
              break;
            case 'disable':
              {
                if (data.channels?.updates?.enabled === false)
                  return message.channel.send({ content: `${emojis.error} The chatbot is already disabled.` });

                await guild.findOneAndUpdate(
                  { id: message.guild?.id },
                  { channels: { updates: { enabled: false, channel: null } } }
                );

                message.channel.send({
                  content: [
                    `${emojis.correct} The channel updates have been disabled in the server.`,
                    `**Example:** \`${prefix}guild update enable #channel\``,
                  ].join('\n'),
                });
              }
              break;
          }
        }
        break;
      case 'logs':
        {
          const enabled = args[1];
          if (!enabled)
            return message.channel.send({
              content: [
                `${emojis.error} Please specify if you want to enable or disable the channel updates.`,
                `**Example:** \`${prefix}guild update enable\``,
              ].join('\n'),
            });

          if (enabled.toLowerCase() !== 'enable' && enabled.toLowerCase() !== 'disable')
            return message.channel.send({
              content: [
                `${emojis.error} Please specify if you want to enable or disable the channel updates.`,
                `**Example:** \`${prefix}guild update enable\``,
              ].join('\n'),
            });

          const data = await guild.findOne({ id: message.guild?.id });
          if (!data) return message.channel.send({ content: `${emojis.error} Unable to find the server data.` });

          switch (enabled.toLowerCase()) {
            case 'enable':
              {
                if (data.channels?.log?.enabled === true)
                  return message.channel.send({
                    content: `${emojis.error} The channel logs are already enabled.`,
                  });

                const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[2]);
                if (!channel)
                  return message.channel.send({
                    content: `${emojis.error} Please mention the channel where you want to enable the channel logs.`,
                  });

                await guild.findOneAndUpdate(
                  { id: message.guild?.id },
                  { channels: { log: { enabled: true, channel: channel.id } } }
                );

                message.channel.send({
                  content: [
                    `${emojis.correct} The channel updates have been enabled in the channel ${channel}.`,
                    `**Example:** \`${prefix}guild logs disable\``,
                  ].join('\n'),
                });
              }
              break;
            case 'disable':
              {
                if (data.channels?.log?.enabled === false)
                  return message.channel.send({
                    content: `${emojis.error} The chatbot is already disabled.`,
                  });

                await guild.findOneAndUpdate(
                  { id: message.guild?.id },
                  { channels: { log: { enabled: false, channel: null } } }
                );

                message.channel.send({
                  content: [
                    `${emojis.correct} The channel logs have been disabled in the server.`,
                    `**Example:** \`${prefix}guild logs enable #channel\``,
                  ].join('\n'),
                });
              }
              break;
          }
        }
        break;
    }
  },
};
