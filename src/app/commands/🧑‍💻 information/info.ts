import { ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';

import { stripIndent } from 'common-tags';
import moment from 'moment';
import os from 'os';

const verificationLevels = ['`None`', '`Low`', '`Medium`', '`High`', '`Highest`'];
const notifications = ['`All`', '`Mentions`'];
const premiumTiers = ['`None`', '`Tier 1`', '`Tier 2`', '`Tier 3`'];

export default new Command(
  new SlashCommandBuilder()
    .setName('info')
    .setDescription('🧑‍💻 Get information about the bot and server')
    .addSubcommandGroup((group) =>
      group
        .setName('bot')
        .setDescription('🧑‍💻 Get information about the bot')
        .addSubcommand((sub) => sub.setName('stats').setDescription('🧑‍💻Get statistics about the bot'))
        .addSubcommand((sub) => sub.setName('ram').setDescription("🧑‍💻 Get the bot's ram usage"))
    )
    .addSubcommandGroup((group) =>
      group
        .setName('server')
        .setDescription('🧑‍💻 Get information about the server')
        .addSubcommand((sub) => sub.setName('stats').setDescription('🧑‍💻 Get statistics about the server'))
        .addSubcommand((sub) =>
          sub
            .setName('roles')
            .setDescription('🧑‍💻 Get information about a role')
            .addRoleOption((option) =>
              option.setName('role').setDescription('🧑‍💻 The role to get information about').setRequired(true)
            )
        )
    ),
  async (client, interaction) => {
    const group = interaction.options.getSubcommandGroup();
    const sub = interaction.options.getSubcommand();

    switch (group) {
      case 'bot':
        {
          switch (sub) {
            case 'stats':
              {
                const { user, guild } = interaction;
                const member = guild?.members.cache.get(user.id);
                const { guilds, channels, ws, uptime, commands } = client;

                const d = moment.duration(uptime);
                const days = `${d.days()} day${d.days() == 1 ? '' : 's'}`;
                const hours = `${d.hours()} hour${d.hours() == 1 ? '' : 's'}`;

                const clientStats = stripIndent`
      Servers   :: ${guilds.cache.size}
      Users     :: ${guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}
      Channels  :: ${channels.cache.size}
      WS Ping   :: ${Math.round(ws.ping)}ms
      Uptime    :: ${days} and ${hours}
    `;
                const serverStats = stripIndent`
      Platform  :: ${os.platform()}
      OS        :: ${os.release()}
      Arch      :: ${os.arch()}
      Hostname  :: ${os.hostname()}
      CPUs      :: ${[...new Set(os.cpus().map((x) => x.model))].join(',')}
      Cores     :: ${os.cpus().length.toString()}
      RAM Total :: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
      RAM Free  :: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
      RAM Usage :: ${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%
      Uptime    :: ${days} and ${hours}
    `;

                const embed = new EmbedBuilder()
                  .setTitle(`${guild?.members.me?.displayName ?? client.user?.username}'s Statistics`)
                  .setColor('Aqua')
                  .addFields([
                    {
                      name: 'Commands',
                      value: `\`${commands.size}\` commands`,
                      inline: true,
                    },
                    {
                      name: 'Bot Stats',
                      value: `\`\`\`asciidoc\n${clientStats}\`\`\``,
                    },
                    {
                      name: 'Host Stats',
                      value: `\`\`\`asciidoc\n${serverStats}\`\`\``,
                    },
                  ])
                  .setFooter({
                    text: member?.displayName ?? user.username,
                    iconURL: member?.displayAvatarURL() ?? user.displayAvatarURL(),
                  })
                  .setTimestamp();

                await interaction.reply({ embeds: [embed] });
              }
              break;
            case 'ram':
              {
                const memoryAll = os.totalmem();
                const memoryOcupe = os.totalmem() - os.freemem();
                const memoryReserved = os.freemem();

                const ramStats = stripIndent`
      RAM Total :: ${(memoryAll / 1024 / 1024).toFixed(2)} MB
      RAM Free  :: ${(memoryReserved / 1024 / 1024).toFixed(2)} MB
      RAM Usage :: ${((1 - memoryReserved / memoryAll) * 100).toFixed(2)}%

      CPU Usage :: ${((os.loadavg()[0] * 100) / os.cpus().length).toFixed(2)}%
      CPU Model :: ${[...new Set(os.cpus().map((x) => x.model))].join(',')}
        `;

                const embed = new EmbedBuilder()
                  .setTitle(`RAM and CPU Information`)
                  .setColor('Aqua')
                  .setFields([
                    {
                      name: 'RAM Stats',
                      value: `\`\`\`asciidoc\n${ramStats}\`\`\``,
                    },
                  ])
                  .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
                  .setTimestamp();

                await interaction.reply({ embeds: [embed] });
              }
              break;
          }
        }
        break;
      case 'server': {
        switch (sub) {
          case 'stats':
            {
              if (!interaction.inCachedGuild()) return;
              const { user, guild, member } = interaction;
              const { id, channels, roles, members, emojis, createdAt } = guild;

              await members.fetch();
              const memberCount = members.cache.size;
              const botCount = members.cache.filter((member) => member.user.bot).size;
              const online = members.cache.filter((member) => member.presence?.status === 'online').size;
              const offline = members.cache.filter(
                (member) => member.presence?.status === 'offline' || member.presence?.status === undefined
              ).size;
              const dnd = members.cache.filter((member) => member.presence?.status === 'dnd').size;
              const afk = members.cache.filter((member) => member.presence?.status === 'idle').size;

              const channelCount = channels.cache.size;
              const textChannels = channels.cache.filter(
                (channel) => channel.type === ChannelType.GuildText && channel.viewable
              ).size;
              const forumChannels = channels.cache.filter(
                (channel) => channel.type === ChannelType.GuildForum && channel.viewable
              ).size;
              const voiceChannels = channels.cache.filter(
                (channel) => channel.type === ChannelType.GuildVoice || channel.type === ChannelType.GuildStageVoice
              ).size;
              const newsChannels = channels.cache.filter(
                (channel) => channel.type === ChannelType.GuildAnnouncement
              ).size;
              const categoryChannels = channels.cache.filter(
                (channel) => channel.type === ChannelType.GuildCategory
              ).size;

              const roleCount = roles.cache.size - 1;
              const emojiCount = emojis.cache.size;

              const serverStats = stripIndent`
      Members  :: [ ${memberCount} ]
               :: ${online} Online
               :: ${dnd} Busy
               :: ${afk} AFK
               :: ${offline} Offline
               :: ${botCount} Bots
      Channels :: [ ${channelCount} ]
               :: ${textChannels} Text
               :: ${forumChannels} Forum
               :: ${voiceChannels} Voice
               :: ${newsChannels} Announcement
               :: ${categoryChannels} Category
      Roles    :: [ ${roleCount} ]
      Emojis   :: [ ${emojiCount} ]
    `;

              const embed = new EmbedBuilder()
                .setTitle(`${guild.name}'s Information`)
                .setThumbnail(guild.iconURL())
                .setColor(guild.members.me?.displayHexColor || 'Green')
                .setFields([
                  {
                    name: 'ID',
                    value: `\`${id}\``,
                    inline: true,
                  },
                  {
                    name: `Owner`,
                    value: `${members.cache.get(guild.ownerId)}`,
                    inline: true,
                  },
                  {
                    name: 'Verification Level',
                    value: verificationLevels[guild.verificationLevel],
                    inline: true,
                  },
                  {
                    name: 'Rules Channel',
                    value: guild.rulesChannel ? `${guild.rulesChannel}` : '`None`',
                    inline: true,
                  },
                  {
                    name: 'System Channel',
                    value: guild.systemChannel ? `${guild.systemChannel}` : '`None`',
                    inline: true,
                  },
                  {
                    name: 'AFK Channel',
                    value: guild.afkChannel ? `${guild.afkChannel.name}` : '`None`',
                    inline: true,
                  },
                  {
                    name: 'Default Notifications',
                    value: notifications[guild.defaultMessageNotifications],
                    inline: true,
                  },
                  {
                    name: 'Partnered',
                    value: `\`${guild.partnered}\``,
                    inline: true,
                  },
                  {
                    name: 'Premium Tier',
                    value: premiumTiers[guild.premiumTier],
                    inline: true,
                  },
                  {
                    name: 'Verified',
                    value: `\`${guild.verified}\``,
                    inline: true,
                  },
                  {
                    name: 'Server Stats',
                    value: `\`\`\`asciidoc\n${serverStats}\`\`\``,
                  },
                ])
                .setFooter({
                  text: member.displayName || user.username,
                  iconURL: member.displayAvatarURL() || user.displayAvatarURL(),
                })
                .setTimestamp();

              await interaction.reply({ embeds: [embed] });
            }
            break;
          case 'roles':
            {
              const role_select = interaction.options.getRole('role');
              if (!role_select) return interaction.reply({ content: 'Please mention a role or provide a role id' });

              const role = interaction.guild?.roles.cache.get(role_select.id);
              if (!role) return interaction.reply({ content: 'Please mention a role or provide a role id' });

              const embeduserinfo = new EmbedBuilder()
                .setThumbnail(interaction.guild?.iconURL() || 'https://i.imgur.com/8DKwbhj.png')
                .setAuthor({
                  name: `Information about: ${role.name}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .addFields(
                  { name: '**Name:**', value: `\`${role.name}\``, inline: true },
                  { name: '**ID:**', value: `\`${role.id}\``, inline: true },
                  { name: '**Color:**', value: `\`${role.hexColor}\``, inline: true },
                  {
                    name: '**Date Created:**',
                    value:
                      '`' +
                      moment(role.createdAt).format('DD/MM/YYYY') +
                      '`\n' +
                      '`' +
                      moment(role.createdAt).format('hh:mm:ss') +
                      '`',
                    inline: true,
                  },
                  {
                    name: '**Position:**',
                    value: `\`${role.rawPosition}\` / \`${interaction.guild?.roles.highest.rawPosition}\``,
                    inline: true,
                  },
                  {
                    name: '**MemberCount:**',
                    value: `\`${role.members.size} Members have it\``,
                    inline: true,
                  },
                  { name: '**Hoisted:**', value: `\`${role.hoist ? '✔️' : '❌'}\``, inline: true },
                  { name: '**Mentionable:**', value: `\`${role.mentionable ? '✔️' : '❌'}\``, inline: true }
                )
                .setColor(role.hexColor)
                .setFooter({
                  text: `Role information: ${role.name}`,
                  iconURL: interaction.user.displayAvatarURL(),
                });

              interaction.reply({ embeds: [embeduserinfo] });
            }
            break;
        }
      }
    }
  }
);
