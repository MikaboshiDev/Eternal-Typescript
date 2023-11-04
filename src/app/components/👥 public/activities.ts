import { Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'activities',
  description: 'Run activities within the discord servers',
  aliases: ['activitie-premium'],
  examples: [
    'activities poker',
    'activities youtube',
    'activities chess',
    'activities checkers',
    'activities sketchheads',
    'activities betrayal',
  ],
  category: 'public',
  premium: false,
  subcommands: [
    'activities poker',
    'activities youtube',
    'activities chess',
    'activities checkers',
    'activities sketchheads',
    'activities betrayal',
  ],
  cooldown: 1000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const voice = message.member?.voice.channel?.id;
    const subcommands = args[0];
    try {
      switch (subcommands) {
        case 'poker':
          {
            if (!voice)
              return message.channel.send({
                content: [
                  `${emojis.error} You must be in a voice channel to use this command!`,
                  `> **Usage:** \`${prefix}activities poker\``,
                ].join('\n'),
              });

            client.discordTogether.createTogetherCode(voice, 'poker').then(async (invite: { code: any }) => {
              return message.channel.send({
                content: [
                  `${emojis.correct} Click here to start **YouTube Together** in a voice channel!`,
                  `> **Link:** https://discord.com/invite/${invite.code}`,
                ].join('\n'),
              });
            });
          }
          break;
        case 'youtube':
          {
            if (!voice)
              return message.channel.send({
                content: [
                  `${emojis.error} You must be in a voice channel to use this command!`,
                  `> **Usage:** \`${prefix}activities youtube\``,
                ].join('\n'),
              });

            client.discordTogether.createTogetherCode(voice, 'youtube').then(async (invite: { code: any }) => {
              return message.channel.send({
                content: [
                  `${emojis.correct} Click here to start **YouTube Together** in a voice channel!`,
                  `> **Link:** https://discord.com/invite/${invite.code}`,
                ].join('\n'),
              });
            });
          }
          break;
        case 'chess':
          {
            if (!voice)
              return message.channel.send({
                content: [
                  `${emojis.error} You must be in a voice channel to use this command!`,
                  `> **Usage:** \`${prefix}activities chess\``,
                ].join('\n'),
              });

            client.discordTogether.createTogetherCode(voice, 'chess').then(async (invite: { code: any }) => {
              return message.channel.send({
                content: [
                  `${emojis.correct} Click here to start **YouTube Together** in a voice channel!`,
                  `> **Link:** https://discord.com/invite/${invite.code}`,
                ].join('\n'),
              });
            });
          }
          break;
        case 'checkers':
          {
            if (!voice)
              return message.channel.send({
                content: [
                  `${emojis.error} You must be in a voice channel to use this command!`,
                  `> **Usage:** \`${prefix}activities checkers\``,
                ].join('\n'),
              });

            client.discordTogether.createTogetherCode(voice, 'checkers').then(async (invite: { code: any }) => {
              return message.channel.send({
                content: [
                  `${emojis.correct} Click here to start **YouTube Together** in a voice channel!`,
                  `> **Link:** https://discord.com/invite/${invite.code}`,
                ].join('\n'),
              });
            });
          }
          break;
        case 'sketchheads':
          {
            if (!voice)
              return message.channel.send({
                content: [
                  `${emojis.error} You must be in a voice channel to use this command!`,
                  `> **Usage:** \`${prefix}activities sketchheads\``,
                ].join('\n'),
              });

            client.discordTogether.createTogetherCode(voice, 'skribbl').then(async (invite: { code: any }) => {
              return message.channel.send({
                content: [
                  `${emojis.correct} Click here to start **YouTube Together** in a voice channel!`,
                  `> **Link:** https://discord.com/invite/${invite.code}`,
                ].join('\n'),
              });
            });
          }
          break;
        case 'betrayal':
          {
            if (!voice)
              return message.channel.send({
                content: [
                  `${emojis.error} You must be in a voice channel to use this command!`,
                  `> **Usage:** \`${prefix}activities betrayal\``,
                ].join('\n'),
              });

            client.discordTogether.createTogetherCode(voice, 'betrayal').then(async (invite: { code: any }) => {
              return message.channel.send({
                content: [
                  `${emojis.correct} Click here to start **YouTube Together** in a voice channel!`,
                  `> **Link:** https://discord.com/invite/${invite.code}`,
                ].join('\n'),
              });
            });
          }
          break;
      }
    } catch (err) {
      logWithLabel('error', `Error on activities command: ${err}`);
      message.channel.send({
        content: [
          `${emojis.error} | **${message.author.username}**, an error occurred while trying to run this command.`,
          `> \`\`\`${err}\`\`\``,
        ].join('\n'),
      });
    }
  },
};
