import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, TextChannel } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { Command } from '../../../../global';
import { findClosestCommand } from '../../../functions/locations';
import { ensureEconomyExists, ensureGuildExists } from '../../../functions/servers';
import guild from '../../../models/guild';
import { client } from '../../../shulker';
import { Event } from '../../../structure/builders';
import { validCode } from '../../../utils/functions';

export default new Event('messageCreate', async (message) => {
  if (message.author.bot || !message.guild || !message.channel) return;
  const guildId = message.guild.id;

  await ensureEconomyExists(message.author.id);
  await ensureGuildExists(guildId);
  await validCode(message);

  const data = await guild.findOne({ id: guildId });
  const prefix = data?.prefix;

  const button = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setLabel('Docs').setStyle(ButtonStyle.Link).setURL('https://docs.night-support.xyz/'),
    new ButtonBuilder().setLabel('Website').setStyle(ButtonStyle.Link).setURL('http://www.night-support.xyz/')
  );

  const botId = client.user?.id ?? '';
  if (message.mentions.has(botId))
    return message.channel.send({
      content: [
        `${emojis.bear} Hello **${message.author.username}**, my prefix is currently ${prefix}.`,
        `If you want to see my commands, type \`${prefix}help\` to see them.`,
      ].join('\n'),
      components: [button as any],
    });

  if (!message.content.startsWith(prefix ?? '!')) return;
  const args = message.content.slice(prefix?.length).trim().split(/ +/g);

  const cmd = args.shift()?.toLowerCase();
  const command: Command =
    (client.precommands.get(cmd ?? '') as Command) ||
    (client.precommands.find((c: any) => c.aliases?.includes(cmd ?? '')) as Command);

  if (!command) {
    const didYouMean = findClosestCommand(cmd ?? '', [...client.precommands.keys()]);
    return message.reply({
      content: [
        `${emojis.error} The command \`${cmd}\` doesn't exist, the development exist`,
        didYouMean ? `Did you mean \`${prefix}${didYouMean}\`?` : '',
      ].join('\n'),
    });
  }

  if (!message.guild.members.me?.permissions.has('SendMessages')) return;

  if (data?.commands?.components === false) {
    message.channel.send({
      content: [
        `${emojis.error} Commands are disabled on this discord server at the moment`,
        `If you want to enable them, type \`${prefix}config commands components enable\``,
      ].join('\n'),
    });
    return;
  }

  const embed = new EmbedBuilder()
    .setAuthor({ name: `Command Control`, iconURL: message.author.displayAvatarURL() })
    .setThumbnail(client.user?.displayAvatarURL() ?? '')
    .setColor('Red');

  if (command.owner && message.author.id !== client.config.dashboard.owner_id)
    return message.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this command because it's only for the owner of the bot.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (command.nsfw && !(message.channel as TextChannel).nsfw)
    return message.reply({
      content: [
        `${emojis.error} You can't use this command in a non-nsfw channel because it's only for nsfw channels.`,
        `If you think this is an error, please contact the server administrator.`,
      ].join('\n'),
    });

  if (command.permissions && !message.member?.permissions.has(command.permissions))
    return message.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this command because you don't have the necessary permissions.`,
            `If you think this is an error, please contact the server administrator.`,
          ].join('\n')
        ),
      ],
    });

  if (command.botpermissions && !message.guild.members.me?.permissions.has(command.botpermissions))
    return message.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} I don't have permission to use this command because I don't have the necessary permissions.`,
            `If you think this is an error, please contact the server administrator.`,
          ].join('\n')
        ),
      ],
    });

  if (command.cooldown) {
    if (client.cooldown.has(`${message.author.id}${command.name}`))
      return message.reply({
        content: [
          `${emojis.error} Hello ${message.author.username}, I'm sorry but you can't execute the mentioned command yet.`,
          `please wait a while: <t:${Math.floor(command.cooldown + Date.now() / 1000)}:R>`,
        ].join('\n'),
      });
    client.cooldown.set(`${message.author.id}${command.name}`, command.cooldown);
    setTimeout(() => {
      client.cooldown.delete(`${message.author.id}${command.name}`);
    }, command.cooldown * 1000);
  }

  if (command.premium) {
    if (data?.premium === false)
      return message.reply({
        content: [
          `${emojis.error} Hello ${message.author.username}, I'm sorry but you can't execute the mentioned command yet.`,
          `This command is only for premium servers, if you want to buy premium, type \`${prefix}premium\``,
        ].join('\n'),
      });
  }

  command.execute(client, message, args, prefix);
});
