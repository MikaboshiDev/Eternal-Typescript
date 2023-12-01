const url =
  'https://wallpapertag.com/wallpaper/full/e/c/6/477550-most-popular-hubble-ultra-deep-field-wallpaper-1920x1200.jpg';
import { Rank } from 'canvacord';
import { AttachmentBuilder, EmbedBuilder, GuildMember, SlashCommandBuilder } from 'discord.js';
import ChannelDB from '../../../models/ranking/channel';
import User from '../../../models/ranking/schema';
import { Command } from '../../../structure/builders';

export default new Command(
  new SlashCommandBuilder()
    .setName('rankers')
    .setDescription('👥 Get the top 10 rankers of the server.')
    .setDMPermission(false)

    .addSubcommand((subcommand) =>
      subcommand
        .setName('status')
        .setDescription('👥 Configure whether to enable or disable the leveling system.')
        .addStringOption((option) =>
          option
            .setName('turn')
            .setDescription('👥 Choose an option.')
            .setRequired(true)
            .addChoices({ name: 'on', value: 'on' }, { name: 'off', value: 'off' })
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('view')
        .setDescription('👥 Check the Level of a User or Your Own')
        .addUserOption((option) =>
          option.setName('user').setDescription("👤 Which User's Level Do You Want to Check?").setRequired(false)
        )
    ),
  async (client, interaction) => {
    if (!interaction.member) return;
    const { guild, options } = interaction;
    if (!guild) return;

    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'view':
        {
          const member = options.getMember('user') || interaction.member;
          let channelDBS;
          let user;
          const guildId = (member as GuildMember).guild.id;
          const userId = (member as GuildMember).user.id;
          user = await User.findOne({ guildId, userId });

          if (!user) {
            user = {
              level: 1,
              xp: 0,
            };
          }

          channelDBS = await ChannelDB.findOne({ guild: guildId });

          const rank = new Rank()
            .setAvatar((member as GuildMember).user.displayAvatarURL())
            .setCurrentXP(user.xp)
            .setLevel(user.level)
            .setRank(0, '0', false)
            .setRequiredXP(user.level * 100)
            .setStatus('online')
            .setProgressBar('#75ff7e', 'COLOR')
            .setUsername((member as GuildMember).user.username)
            .setBackground('IMAGE', channelDBS?.image || url);

          rank.build().then((data) => {
            interaction.reply({
              files: [new AttachmentBuilder(data, { name: 'rank.png' })],
            });
          });
        }
        break;
      case 'status': {
        const status = interaction.options.getString('turn');
        const channelDB3 = await ChannelDB.findOne({ guild: guild.id });

        if (channelDB3) {
          channelDB3.status = status === 'on';
          await channelDB3.save();
        }

        const statusText = channelDB3?.status ? 'on' : 'off';

        const embed = new EmbedBuilder()
          .setTitle('System Configuration Complete')
          .setThumbnail(guild.iconURL({ forceStatic: true }))
          .setColor('Random')
          .setFields(
            { name: 'Moderator:', value: `${interaction.user.username}` },
            {
              name: 'The leveling system has been configured as:',
              value: `Leveling: ${statusText}`,
            }
          )
          .setTimestamp();

        interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
  }
);
