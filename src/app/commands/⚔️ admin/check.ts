import {
  ChannelType,
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  TextChannel,
} from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';
import model from '../../../models/guild';

export default new Command(
  new SlashCommandBuilder()
    .setName('check')
    .setDescription('⚔️ Verification System by Capcha')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption((op) =>
      op
        .setName('channel')
        .setRequired(true)
        .setDescription('⚔️ Choose the channel to which the verification system will be sent')
        .addChannelTypes(ChannelType.GuildText)
    )
    .addStringOption((op) =>
      op
        .setName('message')
        .setRequired(true)
        .setDescription('⚔️ Choose the message that will be sent to the verification channel')
    )
    .addRoleOption((op) => op.setName('role').setDescription('⚔️ Choose the role that will be assigned to the user')),
  async (client, interaction) => {
    const channel = interaction.options.getChannel('channel');
    const mensaje = interaction.options.getString('message');
    const role = interaction.options.getRole('role');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('verify').setLabel('Check').setStyle(ButtonStyle.Secondary)
    );

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setAuthor({
        name: interaction.guild ? interaction.guild.name : 'Private Server Control Systems',
        iconURL: interaction.guild?.iconURL({ forceStatic: true }) as string,
      })
      .setThumbnail(interaction.guild?.iconURL({ forceStatic: true }) as string)
      .setTitle(`${interaction.guild?.name}'s Verification System.`)
      .setDescription(mensaje)
      .setFooter({
        text: 'Private Server Control Systems',
        iconURL: interaction.guild?.iconURL({ forceStatic: true }) as string,
      });
    interaction
      .reply({
        content: [
          `${emojis.correct} The verification system has been successfully configured in the channel ${channel}`,
          `this is the message that will be sent to the channel ${channel}`,
        ].join('\n'),
      })
      .then(async () => {
        const msg = await (channel as TextChannel).send({
          embeds: [embed],
          components: [row as any],
        });

        const data = await model.findOne({ id: interaction.guild?.id });
        if (!data) return logWithLabel('error', `An error occurred while processing the check command`);

        await model.findOneAndUpdate(
          { id: interaction.guild?.id },
          {
            $set: { roleMember: role?.id },
          }
        );
      });
  }
);
