import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import model from '../../../models/guild';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'premium',
  description: 'Give premium to one of the servers associated with me',
  aliases: ['premium-server'],
  category: 'settings',
  premium: false,
  owner: true,
  subcommands: ['premium add <server id>', 'premium remove <server id>', 'premium list'],
  examples: ['premium add 123456789', 'premium remove 123456789', 'premium list'],
  cooldown: 50,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'add':
        {
          const serverId = args[1];
          if (!serverId)
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a server ID to give premium to!`,
                `> **Example:** \`${prefix}premium 123456789\``,
              ].join('\n'),
            });

          const guild = await client.guilds.cache.get(serverId);
          if (!guild)
            return message.channel.send({
              content: [
                `${emojis.error} I couldn't find a server with that ID in my database!`,
                `> **Example:** \`${prefix}premium 123456789\``,
              ].join('\n'),
            });

          const data = await model.findOne({ id: guild.id });
          if (!data || data?.premium)
            return message.channel.send({
              content: [
                `${emojis.error} That server already has premium enabled!`,
                `> **Example:** \`${prefix}premium 123456789\``,
              ].join('\n'),
            });

          await model.findOneAndUpdate({ id: guild.id }, { premium: true });
          message.channel.send({
            content: [
              `${emojis.correct} Successfully given premium to **${guild.name}**!`,
              `> **Example:** \`${prefix}premium 123456789\``,
            ].join('\n'),
          });
          logWithLabel('info', `Premium was given to ${guild.name} (${guild.id})`);
        }
        break;
      case 'remove':
        {
          const serverId = args[1];
          if (!serverId)
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a server ID to remove premium from!`,
                `> **Example:** \`${prefix}premium remove 123456789\``,
              ].join('\n'),
            });

          const guild = await client.guilds.cache.get(serverId);
          if (!guild)
            return message.channel.send({
              content: [
                `${emojis.error} I couldn't find a server with that ID in my database!`,
                `> **Example:** \`${prefix}premium remove 123456789\``,
              ].join('\n'),
            });

          const data = await model.findOne({ id: guild.id });
          if (!data || !data?.premium)
            return message.channel.send({
              content: [
                `${emojis.error} That server doesn't have premium enabled!`,
                `> **Example:** \`${prefix}premium remove 123456789\``,
              ].join('\n'),
            });

          await model.findOneAndUpdate({ id: guild.id }, { premium: false });
          message.channel.send({
            content: [
              `${emojis.correct} Successfully removed premium from **${guild.name}**!`,
              `> **Example:** \`${prefix}premium remove 123456789\``,
            ].join('\n'),
          });
          logWithLabel('info', `Premium was removed from ${guild.name} (${guild.id})`);
        }
        break;
      case 'list':
        {
          const data = await model.find({ premium: true });
          if (!data || !data.length)
            return message.channel.send({
              content: [
                `${emojis.error} I couldn't find any servers with premium enabled!`,
                `> **Example:** \`${prefix}premium list\``,
              ].join('\n'),
            });

          const embed = new EmbedBuilder()
            .setColor('Green')
            .setTimestamp()
            .setFooter({
              text: message.author.tag,
              iconURL: message.author.displayAvatarURL({ forceStatic: true }) as any,
            })
            .setTitle('Servers with premium enabled')
            .setDescription(
              data
                .map(
                  (x: any) =>
                    `\`No. ${data.indexOf(x) + 1}\` - **${client.guilds.cache.get(x.id)?.name}**\n> **ID:** \`${x.id}\``
                )
                .join('\n')
            );
          message.channel.send({ embeds: [embed] });
        }
        break;
    }
  },
};
