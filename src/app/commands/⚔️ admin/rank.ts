import {
  AttachmentBuilder,
  SlashCommandBuilder,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  GuildMember,
  PermissionResolvable,
} from 'discord.js';
import { Rank } from 'canvacord';
import User from '../../../models/ranking/schema';
import ChannelDB from '../../../models/ranking/channel';
import { logWithLabel } from '../../../utils/console';
import { Command } from '../../../class/builders';

export default new Command(
  new SlashCommandBuilder()
    .setName('rank')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription('⚔️ Set the rank of a user in the database')
    .addSubcommand((subcommand) => subcommand.setName('delete').setDescription('⚔️ Delete the Ranking System'))
    .addSubcommand((subcommand) =>
      subcommand
        .setName('setup')
        .setDescription('⚔️ Start configuring our ranking system.')
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('⚔️ Where should I send the level up notifications?')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
        .addAttachmentOption((option) =>
          option.setName('image').setDescription('⚔️ Add your custom image as the background').setRequired(false)
        )
    ),
  async (client, interaction) => {
    const { guild, options } = interaction;
    if (!interaction.member) return;
    if (!guild) return;

    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'setup':
        {
          const channel = options.getChannel('channel');
          const image = options.getAttachment('image');
          const channelDB = await ChannelDB.findOne({ guild: guild.id });

          if (channelDB) {
            const Exist = new EmbedBuilder()
              .setTitle('We Have a Problem.')
              .setColor('Red')
              .setFields(
                {
                  name: 'The channel has already been previously configured.',
                  value: `It is located in: <#${channelDB.channel}>`,
                },
                {
                  name: 'If you want to change it, you will have to delete it and reconfigure it using:',
                  value: '`/ranking delete`',
                }
              );
            return interaction.reply({
              embeds: [Exist],
              ephemeral: true,
            });
          }

          const completedEmbed = new EmbedBuilder()
            .setColor('Green')
            .setImage(
              image?.proxyURL ||
                'https://wallpapertag.com/wallpaper/full/e/c/6/477550-most-popular-hubble-ultra-deep-field-wallpaper-1920x1200.jpg'
            )
            .setFields(
              {
                name: 'Ranking Announcement Channel Successfully Configured',
                value: `Moderator: <@${(interaction.member as GuildMember).id}>`,
              },
              {
                name: 'Configured Channel:',
                value: `<#${channel?.id}>`,
                inline: true,
              },
              {
                name: 'If you added a background image',
                value: 'You will see it in this embed, or you will see the default image.',
              }
            )
            .setTimestamp();

          interaction.reply({
            embeds: [completedEmbed],
          });

          const newChannelDB = new ChannelDB({
            guild: guild.id,
            channel: channel?.id,
            image: image?.proxyURL || 'default-image-url',
          });

          const savedChannelDB = await newChannelDB.save();

          if (!savedChannelDB) {
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle('We Have a Problem.')
                  .setColor('Red')
                  .setDescription(
                    `It seems I couldn't save the channel correctly. The developer has been notified. Please try again in the next 10 minutes.`
                  )
                  .setThumbnail(guild.iconURL({ forceStatic: true })),
              ],
            });
          }
        }
        break;
      case 'delete':
        {
          const channelDB2 = await ChannelDB.findOne({ guild: guild.id }, { channel: interaction.channel?.id });

          if (!channelDB2) {
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle('We Have a Problem.')
                  .setColor('Red')
                  .setDescription(
                    `It seems this server has not configured any channel yet. Contact an administrator to resolve this.`
                  )
                  .setThumbnail(guild.iconURL({ forceStatic: true })),
              ],
            });
          }

          const deletedChannelDB = await ChannelDB.findOneAndDelete({
            channel: interaction.channel?.id,
          });

          if (!deletedChannelDB) {
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle('We Have a Problem.')
                  .setColor('Red')
                  .setDescription(
                    `I encountered an error while trying to delete the configured channel. Please try again in the next 10 minutes as our developer will be working to resolve it.`
                  )
                  .setThumbnail(guild.iconURL({ forceStatic: true })),
              ],
            });
          }

          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Configuration Successfully Deleted.')
                .setColor('Aqua')
                .setFields({
                  name: 'Deleted by moderator:',
                  value: `<@${(interaction.member as GuildMember).id}>`,
                })
                .setThumbnail(guild.iconURL({ forceStatic: true })),
            ],
            ephemeral: true,
          });
        }
        break;
    }
  }
);
