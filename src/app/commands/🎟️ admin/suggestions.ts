import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import SuggestionSetup from '../../../models/questions/setups';
import Suggestions from '../../../models/questions/quest';
import { logWithLabel } from '../../../utils/console';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';

export default new Command(
  new SlashCommandBuilder()
    .setName(`quest`)
    .setDescription(`manage the suggestion system`)
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((subcommand) => {
      return subcommand
        .setName('setup')
        .setDescription(`❔ set the suggestion system for the server up`)
        .addChannelOption((option) => {
          return option
            .setName(`channel`)
            .setDescription(`Chose a specific channel to send suggests to`)
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText);
        })
        .addRoleOption((option) => {
          return option
            .setName(`manager`)
            .setDescription(`Provide a role to manage suggestions`)
            .setRequired(true);
        })
        .addStringOption((option) => {
          return option
            .setName(`color`)
            .setDescription(`Chose a embed color to use on embeds`)
            .setRequired(true)
            .addChoices(
              { name: `red`, value: `#D84559` },
              { name: `invisible`, value: `#303135` },
              { name: `blurple`, value: `#5865F2` },
              { name: `yellow`, value: `#FEE75C` },
              { name: `white`, value: `#FFFFFF` },
              { name: `fuchsia`, value: `#EB459E` },
              { name: `green`, value: `#57F287` }
            );
        })
        .addStringOption((option) => {
          return option
            .setName(`accept`)
            .setDescription(`Chose a color on accepted suggestions`)
            .setRequired(true)
            .addChoices(
              { name: `red`, value: `#D84559` },
              { name: `invisible`, value: `#303135` },
              { name: `blurple`, value: `#5865F2` },
              { name: `yellow`, value: `#FEE75C` },
              { name: `white`, value: `#FFFFFF` },
              { name: `fuchsia`, value: `#EB459E` },
              { name: `green`, value: `#57F287` }
            );
        })
        .addStringOption((option) => {
          return option
            .setName(`declined`)
            .setDescription(`Chose a color on declined suggestions`)
            .setRequired(true)
            .addChoices(
              { name: `red`, value: `#D84559` },
              { name: `invisible`, value: `#303135` },
              { name: `blurple`, value: `#5865F2` },
              { name: `yellow`, value: `#FEE75C` },
              { name: `white`, value: `#FFFFFF` },
              { name: `fuchsia`, value: `#EB459E` },
              { name: `green`, value: `#57F287` }
            );
        });
    })
    .addSubcommand((subcommand) => {
      return subcommand
        .setName('delete')
        .setDescription(`delete the suggestion data on the server`)
    }),
  async (client, interaction) => {
    const { guild, channel, options } = interaction;
    const i = interaction;

    if (interaction.options.getSubcommand() === 'setup') {
      const channel = options.getChannel('channel');
      const role = options.getRole('manager');
      const embedColor = options.getString('color');
      const acceptedColor = options.getString('accept');
      const declined_color = options.getString('declined');

      await SuggestionSetup.findOneAndUpdate(
        { GuildID: guild?.id },
        {
          SuggestChannel: channel?.id,
          ManagerRole: role?.id,
          embedColor: embedColor,
          AcceptColor: acceptedColor,
          DeclineColor: declined_color,
        },
        {
          new: true,
          upsert: true,
        }
      );

      i.reply({
        content: [
          `${emojis.correct} **Success:** You have successfully set up the suggestion system!`,
          `> **Channel:** ${channel}`,
        ].join('\n'),
        ephemeral: true,
      });
    }
    if (interaction.options.getSubcommand() === 'delete') {
      await SuggestionSetup.findOneAndDelete(
        { GuildID: guild?.id },
        {
          GuildID: guild?.id,
        }
      );

      await Suggestions.deleteMany(
        { GuildID: guild?.id, ChannelID: channel?.id },
        {
          GuildID: guild?.id,
        }
      );

      if (!SuggestionSetup)
        return i.reply({
          content: [
            `${emojis.error} **Error:** You have not set up the suggestion system yet!`,
            `> **How to set up:** \`/suggestion setup\``,
          ].join('\n'),
          ephemeral: true,
        });

      i.reply({
        content: [
          `${emojis.correct} **Success:** You have successfully deleted the suggestion system!`,
          `> **Channel:** ${channel}`,
        ].join('\n'),
        ephemeral: true,
      });
    }
  }
);
