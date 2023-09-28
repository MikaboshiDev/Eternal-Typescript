import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import user from '../../../models/economy/user';
import { stripIndent } from 'common-tags';
import moment from 'moment';
import os from 'os';

module.exports = {
  name: 'info',
  description: 'information about the bot and the developer',
  aliases: ['information', 'informacion'],
  category: 'public',
  examples: [
    `information [subcommand] [properties]`,
    `information [command]`,
    `information bot [general|ram|guilds] [properties]`,
  ],
  subcommands: [`information bot <general|ram|guilds>`, `information role <role>`, `information server`],
  cooldown: 5000,
  premium: false,
  async execute(client: any, message: Message, args: string[]) {
    const { guilds, channels, ws, uptime, commands } = client;
    const guild = message.guild;
    const subcommands = args[0];

    switch (subcommands) {
      case 'bot':
        {
          const choice = args[1];
          switch (choice) {
            case 'general':
              {
                const d = moment.duration(uptime);
                const days = `${d.days()} day${d.days() == 1 ? '' : 's'}`;
                const hours = `${d.hours()} hour${d.hours() == 1 ? '' : 's'}`;

                const clientStats = stripIndent`
      Servers   :: ${guilds.cache.size}
      Users     :: ${guilds.cache.reduce((acc: any, guild: { memberCount: any }) => acc + guild.memberCount, 0)}
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
                  .addFields(
                    {
                      name: 'Commands',
                      value: [
                        `[\`${commands.size}\`] Commands`,
                        `Aplication: ${client.user?.username} (\`${client.user?.id}\`)`,
                        `Node: ${process.version} on ${process.platform} ${process.arch}`,
                      ].join('\n'),
                      inline: true,
                    },
                    { name: 'Bot Stats', value: `\`\`\`asciidoc\n${clientStats}\`\`\`` },
                    { name: 'Host Stats', value: `\`\`\`asciidoc\n${serverStats}\`\`\`` }
                  )
                  .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
                  .setTimestamp();

                await message.channel.send({ embeds: [embed] });
              }
              break;
            case 'ram':
              {
                const memoryAll = os.totalmem();
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
                  .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
                  .setTimestamp();

                await message.channel.send({ embeds: [embed] });
              }
              break;
            case 'guilds':
              {
                const guilds = client.guilds.cache
                  .map((guild: any) => {
                    return `${guild.name} - ${guild.id}`;
                  })
                  .join('\n');
                const embed = new EmbedBuilder()
                  .setTitle(`Guilds`)
                  .setColor('Aqua')
                  .setDescription(`\`\`\`asciidoc\n${guilds}\`\`\``)
                  .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
                  .setTimestamp();

                await message.channel.send({ embeds: [embed] });
              }
              break;
          }
        }
        break;
      case 'role':
        {
          const role = message.mentions.roles.first() || message.guild?.roles.cache.get(args[1]);
          if (!role) return message.channel.send({ content: 'Please mention a role or provide a role id' });

          const embeduserinfo = new EmbedBuilder()
            .setThumbnail(client.user?.displayAvatarURL())
            .setAuthor({ name: `Information about: ${role.name}`, iconURL: message.author.displayAvatarURL() })
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
                value: `\`${role.rawPosition}\` / \`${message.guild?.roles.highest.rawPosition}\``,
                inline: true,
              },
              { name: '**MemberCount:**', value: `\`${role.members.size} Members have it\``, inline: true },
              { name: '**Hoisted:**', value: `\`${role.hoist ? '✔️' : '❌'}\``, inline: true },
              { name: '**Mentionable:**', value: `\`${role.mentionable ? '✔️' : '❌'}\``, inline: true }
            )
            .setColor(role.hexColor)
            .setFooter({ text: `Role information: ${role.name}`, iconURL: message.author.displayAvatarURL() });

          message.channel.send({ embeds: [embeduserinfo] });
        }
        break;
      case 'server':
        {
          const { author, guild, member } = message;
          const { id, channels, roles, members, emojis } = message ? guild : client.guilds.cache.get(args[1]);

          await members.fetch();
          const memberCount = members.cache.size;
          const botCount = members.cache.filter((member: { user: { bot: any } }) => member.user.bot).size;
          const online = members.cache.filter(
            (member: { presence: { status: string } }) => member.presence?.status === 'online'
          ).size;
          const offline = members.cache.filter(
            (member: { presence: { status: string | undefined } }) =>
              member.presence?.status === 'offline' || member.presence?.status === undefined
          ).size;
          const dnd = members.cache.filter(
            (member: { presence: { status: string } }) => member.presence?.status === 'dnd'
          ).size;
          const afk = members.cache.filter(
            (member: { presence: { status: string } }) => member.presence?.status === 'idle'
          ).size;

          const channelCount = channels.cache.size;
          const textChannels = channels.cache.filter(
            (channel: { type: any; viewable: any }) => channel.type === ChannelType.GuildText && channel.viewable
          ).size;
          const forumChannels = channels.cache.filter(
            (channel: { type: any; viewable: any }) => channel.type === ChannelType.GuildForum && channel.viewable
          ).size;
          const voiceChannels = channels.cache.filter(
            (channel: { type: any }) =>
              channel.type === ChannelType.GuildVoice || channel.type === ChannelType.GuildStageVoice
          ).size;
          const newsChannels = channels.cache.filter(
            (channel: { type: any }) => channel.type === ChannelType.GuildAnnouncement
          ).size;
          const categoryChannels = channels.cache.filter(
            (channel: { type: any }) => channel.type === ChannelType.GuildCategory
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
            .setTitle(`${guild?.name}'s Information`)
            .setThumbnail(author.displayAvatarURL())
            .setColor(guild?.members.me?.displayHexColor || 'Green')
            .setFields([
              {
                name: 'ID',
                value: `\`${id}\``,
                inline: true,
              },
              {
                name: `Owner`,
                value: `${members.cache.get(guild?.ownerId)}`,
                inline: true,
              },
              {
                name: 'Rules Channel',
                value: guild?.rulesChannel ? `${guild?.rulesChannel}` : '`None`',
                inline: true,
              },
              {
                name: 'System Channel',
                value: guild?.systemChannel ? `${guild?.systemChannel}` : '`None`',
                inline: true,
              },
              {
                name: 'AFK Channel',
                value: guild?.afkChannel ? `${guild?.afkChannel.name}` : '`None`',
                inline: true,
              },
              {
                name: 'Partnered',
                value: `\`${guild?.partnered}\``,
                inline: true,
              },
              {
                name: 'Verified',
                value: `\`${guild?.verified}\``,
                inline: true,
              },
              {
                name: 'Server Stats',
                value: `\`\`\`asciidoc\n${serverStats}\`\`\``,
              },
            ])
            .setFooter({
              text: member?.displayName || user ? author.username : author.username,
              iconURL: member?.displayAvatarURL() || author.displayAvatarURL(),
            })
            .setTimestamp();

          await message.channel.send({ embeds: [embed] });
        }
        break;
    }
  },
};
