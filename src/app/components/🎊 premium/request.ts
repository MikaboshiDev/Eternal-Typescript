import axios from 'axios';
import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';

function replaceParam(string: string, message: { guild: { id: any }; author: { id: any }; channel: { id: any } }) {
  return string
    .replace(/{guildId}/g, message.guild.id)
    .replace(/{authorId}/g, message.author.id)
    .replace(/{channelId}/g, message.channel.id);
}

module.exports = {
  name: 'request',
  cooldown: 20,
  permissions: ['Administrator'],
  botpermissions: ['Administrator'],
  description: 'The request (GET, POST, PUT, DELETE) method for the API',
  examples: [`request [method] [url] [body]`, `request [method] [url]`],
  aliases: ['req', 'api', 'request-api'],
  category: 'premium',
  premium: true,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const methods = ['get', 'post', 'patch', 'put', 'delete'];
    const Api_Url = 'https://discord.com/api/v10';
    const method = args[0]?.toLowerCase();

    if (!method || !methods.includes(method)) {
      return message.reply({
        content: [
          `${emojis.error} The method is invalid or not provided (get, post, patch, put, delete)`,
          `Usage: \`${prefix}request <method> <url> [body]\``,
        ].join('\n'),
      });
    }

    const url = args[1];
    if (!url) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: true }) })
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL({ forceStatic: true }),
            })
            .setDescription(
              [
                `${emojis.error} The URL was not provided or invalid [Documentation Api](https://discord.com/developers/docs/reference)`,
                `Usage: \`${prefix}request <method> <url> [body]\``,
                `Settings: \`\`\`json\n1. /{guildId}/ - ${message.guild?.id}\n2. /{authorId}/ - ${message.author.id}\n3. /{channelId}/ - ${message.channel.id}\n\`\`\``,
              ].join('\n')
            )
            .setTimestamp()
            .setColor('Red'),
        ],
      });
    }

    const body = args.slice(2).join(' ');
    try {
      const res = await axios({
        method: methods[method as any],
        url:
          Api_Url +
          replaceParam(url, {
            guild: { id: message.guild?.id },
            author: { id: message.author.id },
            channel: { id: message.channel.id },
          }),
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`,
          'Content-Type': 'application/json',
        },
        data: body ? JSON.parse(body) : undefined,
      });

      if (res.data.code === 50035 || res.data.code === 0) {
        const embed = new EmbedBuilder()
          .setColor('Random')
          .setTitle(`Success Request Owner`)
          .setDescription(`\`\`\`json\n${JSON.stringify(res.data, null, 4).slice(0, 2000)}\`\`\``)
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: true }) })
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ forceStatic: true }),
          })
          .setTimestamp();

        const embed2 = new EmbedBuilder()
          .setColor('Random')
          .setTitle(`Success Request Owner`)
          .setDescription(`\`\`\`json\n${JSON.stringify(res.data, null, 4).slice(2000, 4000)}\`\`\``)
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: true }) })
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ forceStatic: true }),
          })
          .setTimestamp();

        return message.channel.send({ embeds: [embed, embed2] });
      } else {
        const embed = new EmbedBuilder()
          .setColor('Random')
          .setTitle(`Success Request Owner`)
          .setDescription(`\`\`\`json\n${JSON.stringify(res.data, null, 4).slice(0, 2000)}\`\`\``)
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: true }) })
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ forceStatic: true }),
          })
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      }
    } catch (e) {
      console.log(e);
      message.channel.send({
        content: [
          `${emojis.error} The body provided is invalid or too large (max 2000 characters)`,
          `Usage: \`${prefix}request <method> <url> [body]\``,
        ].join('\n'),
      });
    }
  },
};
