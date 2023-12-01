import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import guild from '../../../models/guild';
import { Command } from '../../../structure/builders';
import { logWithLabel } from '../../../utils/console';
export default new Command(
  new SlashCommandBuilder()
    .setName('components')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDescription('👑 Enable or disable bot configuration properties')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('messages')
        .setDescription('👑 Enable or disable bot messages commands')
        .addBooleanOption((option) =>
          option.setName('enable').setDescription('👑 Enable or disable messages commands').setRequired(true)
        )
    ),
  async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'messages': {
        const data = await guild.findOne({ id: interaction.guild?.id });
        if (!data)
          return interaction.reply({
            content: [
              `${emojis.error} The server does not have a database record`,
              `If you want to create it, type.`,
            ].join('\n'),
          });

        const value = interaction.options.getBoolean('enable', true);
        await guild.findOneAndUpdate(
          { id: interaction.guild?.id },
          {
            $set: {
              'commands.components': value,
            },
          }
        );

        logWithLabel(
          'discord',
          `The messages commands have been ${value ? 'enabled' : 'disabled'} in the server ${interaction.guild?.name}`
        );

        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(' Manager - Commands ')
              .setDescription(
                [
                  `The messages commands have been ${value ? 'enabled' : 'disabled'}`,
                  `These are the data related to the process:`,
                ].join('\n')
              )
              .setFooter({
                text: `${interaction.guild?.name}`,
                iconURL: interaction.user.displayAvatarURL(),
              }),
          ],
        });
      }
    }
  }
);
