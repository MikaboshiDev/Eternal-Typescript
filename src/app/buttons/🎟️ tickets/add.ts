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

    const filter = (i: any) => i.customId === 'add_user_ticket' && i.user.id === member.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (i: any) => {
      const user = i.values[0];
      if (interaction.channel.permissionOverwrites.cache.has(user.id))
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle('Ticket System')
              .setDescription(
                [
                  `The user ${user} is already on the ticket at this time`,
                  `please select someone else from the menu`,
                ].join('\n')
              ),
          ],
        });

      await interaction.channel.permissionOverwrites.create(user.id, {
        ViewChannel: true,
      });

      interaction.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle('Ticket System')
            .setDescription(
              [`The user ${user} has been added to the ticket`, `Now you can chat with him in the ticket`].join('\n')
            ),
        ],
        ephemeral: true,
      });
    });
  },
};
