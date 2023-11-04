import axios from 'axios';
import { ActionRowBuilder, EmbedBuilder, Message, StringSelectMenuBuilder } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import words from '../../../../config/words.json';
const Api_Url = 'https://discord.com/api/v10';

module.exports = {
  name: 'automoderation',
  permissions: ['ManageGuild'],
  botpermissions: ['ManageGuild'],
  description: 'Create automatic rules for greater security within the Discord server',
  aliases: ['automod', 'auto-moderation', 'auto-mod'],
  examples: [
    'automoderation create "Financial Discussions" 1 1 1 1 true',
    'automoderation delete 123456789',
    'automoderation list',
  ],
  category: 'premium',
  premium: true,
  cooldown: 1000,
  subcommands: [
    'automoderation create <name> <event_type> <actions> <trigger_type> <trigger_metadata> <enabled>',
    'automoderation delete <id>',
    'automoderation list',
  ],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'create':
        {
          const name = args[1];
          if (!name)
            return message.channel.send({
              content: [
                `${emojis.error} You need to provide a name for the rule you want to create in order to continue`,
                `Example: \`${prefix}automoderation create "Financial Discussions" 1 1 1 1 true\``,
              ].join('\n'),
            });

          const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[2]) || null;
          if (!channel)
            return message.channel.send({
              content: [
                `${emojis.error} You need to provide a channel for the rule you want to create in order to continue`,
                `Example: \`${prefix}automoderation create "Financial Discussions" 1 1 1 1 true\``,
              ].join('\n'),
            });

          const response = await axios({
            method: 'post',
            url: `${Api_Url}/guilds/${message.guild?.id}/auto-moderation/rules`,
            headers: {
              Authorization: `Bot ${process.env.token}`,
              'Content-Type': 'application/json',
            },
            data: {
              name: name,
              event_type: 1,
              actions: [
                {
                  type: 1,
                  metadata: {
                    custom_message:
                      'Keep your arguments and other personal problems out of the discord server channels',
                  },
                },
                {
                  type: 2,
                  metadata: {
                    channel_id: channel.id,
                  },
                },
                {
                  type: 3,
                  metadata: {
                    duration_seconds: 60,
                  },
                },
              ],
              trigger_type: 1,
              trigger_metadata: {
                keyword_filter: words.slice(0, 900),
              },
              enabled: true,
            },
          });

          message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle('Auto Moderation Rule Created')
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(
                  `The rule \`${response.data.name}\` has been created with the ID \`${response.data.id}\``
                )
                .setColor('Green')
                .setTimestamp()
                .addFields(
                  { name: 'Rule Name', value: `> ${response.data.name}`, inline: true },
                  { name: 'Rule ID', value: `> ${response.data.id}`, inline: true }
                ),
            ],
          });
        }
        break;
      case 'delete':
        {
          const id = args[1];
          if (!id)
            return message.channel.send({
              content: [
                `${emojis.error} You need to provide an ID for the rule you want to delete in order to continue`,
                `Example: \`${prefix}automoderation delete 123456789\``,
              ].join('\n'),
            });

          const response = await axios({
            method: 'delete',
            url: `${Api_Url}/guilds/${message.guild?.id}/auto-moderation/rules/${id}`,
            headers: {
              Authorization: `Bot ${process.env.token}`,
              'Content-Type': 'application/json',
            },
          }).catch((err: any) => {
            message.channel.send({
              content: [
                `${emojis.error} The rule with the ID \`${id}\` does not exist or has already been deleted`,
                `Example: \`${prefix}automoderation delete 123456789\``,
              ].join('\n'),
            });
          });

          message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle('Auto Moderation Rule Deleted')
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(
                  [
                    `${emojis.correct} The self-moderation rule that you selected has been removed`,
                    `thanks to the rule with the ID \`${id}\``,
                  ].join('\n')
                )
                .setColor('Green')
                .setTimestamp(),
            ],
          });
        }
        break;
      case 'list':
        {
          const response = await axios({
            method: 'get',
            url: `${Api_Url}/guilds/${message.guild?.id}/auto-moderation/rules`,
            headers: {
              Authorization: `Bot ${process.env.token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.data.length)
            return message.channel.send({
              content: [
                `${emojis.error} There are no rules for self-moderation in this server`,
                `Example: \`${prefix}automoderation create "Financial Discussions" 1 1 1 1 true\``,
              ].join('\n'),
            });

          const rules = response.data.map((rule: any) => {
            return `No.${response.data.indexOf(rule) + 1} - ${rule.name} - \`${rule.id}\``;
          });

          const menu_config = new StringSelectMenuBuilder()
            .setCustomId('premium_automod_menu')
            .setPlaceholder('Select one of the options from the menu')
            .setOptions(
              {
                label: 'Create a rule',
                value: 'first_option',
                description: 'Create a rule for self-moderation',
                emoji: '📝',
              },
              {
                label: 'Delete a rule',
                value: 'second_option',
                description: 'Delete a rule for self-moderation',
                emoji: '🗑️',
              },
              {
                label: 'Delete all',
                value: 'third_option',
                description: 'Delete all rules for self-moderation',
                emoji: '🗑️',
              }
            );

          const menu = new ActionRowBuilder().addComponents(menu_config);

          message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle('Auto Moderation Rules')
                .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`The rules for this server are listed below`)
                .setColor('Green')
                .setTimestamp()
                .addFields({ name: 'Rules List', value: `${rules.join('\n')}`, inline: false }),
            ],
            components: [menu as any],
          });
        }
        break;
    }
  },
};
