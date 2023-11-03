import { EmbedBuilder } from 'discord.js';
import model from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'prioridad_ticket',
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

    const creator = interaction.guild.members.cache.get(data.CreatedBy);
    if (channel.name === `🔴` + `︰` + creator.user.username + creator.user.discriminator) {
      embed
        .setColor('Red')
        .setTitle('Ticket System')
        .setDescription(
          [
            `This ticket is already in priority on the server.`,
            `of the server and the ticket will be closed in 5 seconds.`,
          ].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true }).catch(() => {});
    }

    await channel.setName(`🔴` + `︰` + creator.user.username + creator.user.discriminator).catch(() => {});
    interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Green')
            .setTitle('Ticket System')
            .setDescription(
              [
                `The ticket has been put in priority successfully.`,
                `thanks for using the ticket system of the server.`,
              ].join('\n')
            ),
        ],
        ephemeral: true,
      })
      .catch(() => {});
  },
};
