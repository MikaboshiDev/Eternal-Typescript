import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'datos_ticket',
  async execute(interaction: any, client: any) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Ticket Information')
          .addFields({
            name: `Generated Data (${new Date(interaction.channel.createdAt).toLocaleDateString()})`,
            value: [
              `**Channel ID:** ${interaction.channel.id}`,
              `**Channel Name:** ${interaction.channel.name}`,
              `**Channel Type:** ${interaction.channel.type}`,
              `**Channel Created At:** ${new Date(interaction.channel?.createdAt).toLocaleDateString()}`,
              `**Channel Created Timestamp:** ${interaction.channel.createdTimestamp}`,
              `**Channel Created By:** ${interaction.channel.createdTimestamp}`,
            ].join('\n'),
          })
          .setColor('Random')
          .setTimestamp()
          .setThumbnail(interaction.guild?.iconURL({ forceStatic: true }))
          .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({ forceStatic: true }),
          }),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Ticket URL')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)
        ),
      ],
      ephemeral: true,
    });
  },
};
