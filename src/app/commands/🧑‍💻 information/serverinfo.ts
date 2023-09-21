import { ChannelType, EmbedBuilder, Emoji, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import { stripIndent } from 'common-tags';

const verificationLevels = ['`None`', '`Low`', '`Medium`', '`High`', '`Highest`'];
const notifications = ['`All`', '`Mentions`'];
const premiumTiers = ['`None`', '`Tier 1`', '`Tier 2`', '`Tier 3`'];

export default new Command(
  new SlashCommandBuilder().setName('serverinfo').setDMPermission(false).setDescription('Replies with Server Info! is thas a jojo reference?'),
  async (client, interaction) => {
    if (!interaction.inCachedGuild()) return;
    const { user, guild, member } = interaction;
    const { id, channels, roles, members, emojis, createdAt } = guild;

    await members.fetch();
    const memberCount = members.cache.size;
    const botCount = members.cache.filter((member) => member.user.bot).size;
    const online = members.cache.filter((member) => member.presence?.status === 'online').size;
    const offline = members.cache.filter((member) => member.presence?.status === 'offline' || member.presence?.status === undefined).size;
    const dnd = members.cache.filter((member) => member.presence?.status === 'dnd').size;
    const afk = members.cache.filter((member) => member.presence?.status === 'idle').size;

    const channelCount = channels.cache.size;
    const textChannels = channels.cache.filter((channel) => channel.type === ChannelType.GuildText && channel.viewable).size;
    const forumChannels = channels.cache.filter((channel) => channel.type === ChannelType.GuildForum && channel.viewable).size;
    const voiceChannels = channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice || channel.type === ChannelType.GuildStageVoice
    ).size;
    const newsChannels = channels.cache.filter((channel) => channel.type === ChannelType.GuildAnnouncement).size;
    const categoryChannels = channels.cache.filter((channel) => channel.type === ChannelType.GuildCategory).size;

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
);
