import { ActionRowBuilder, EmbedBuilder, UserSelectMenuBuilder } from 'discord.js';
import model from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'agregar_usuario',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();

    const ticketSetup = await model.findOne({ GuildID: guild?.id });
    if (!ticketSetup)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setTitle('Ticket System')
            .setDescription(
              [
                `There is no ticket system set up on the discord server`,
                `Verify that the system is installed on the server`,
              ].join('\n')
            ),
        ],
        ephemeral: true,
      });

    const data = await DB.findOne({ ChannelID: channel.id });
    if (!data)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Red')
            .setTitle('Ticket System')
            .setDescription(
              [
                `The channel where this button is being executed is not a ticket`,
                `Please verify that you are within a ticket`,
              ].join('\n')
            ),
        ],
        ephemeral: true,
      });

    interaction.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor('Green')
          .setDescription(
            [
              `Please select the user you want to add to this ticket`,
              `Remember that it must be someone who is not already on the ticket.`,
            ].join('\n')
          ),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new UserSelectMenuBuilder()
            .setCustomId('add_user_ticket')
            .setPlaceholder('Select a user from the menu')
            .setMaxValues(1)
        ),
      ],
    });
  },
};
