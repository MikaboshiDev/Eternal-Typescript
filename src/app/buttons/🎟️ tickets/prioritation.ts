import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'prioridad_ticket',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();

    const ticketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
    if (!ticketSetup) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [`\`👤\` Reason: There is no data in the database.`, `\`⭐\` Date: ${new Date().toLocaleDateString()}`].join(
            '\n'
          )
        );
      return interaction.reply({ embeds: [embed], ephemeral: true }).catch(() => {});
    }

    const data = await DB.findOne({ ChannelID: channel.id });
    if (!data) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [
            `\`👤\` Reason: There are no previously saved data.`,
            `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
          ].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true }).catch(() => {});
    }
    const creator = interaction.guild.members.cache.get(data.CreatedBy);
    if (channel.name === `🔴` + `︰` + creator.user.username + creator.user.discriminator) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [
            `\`👤\` Reason: This ticket is already in priority on the server.`,
            `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
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
            .setTitle('Ticket System! 🟢')
            .setDescription(
              [
                `\`👤\` Reason: The ticket has been put in priority successfully.`,
                `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
              ].join('\n')
            ),
        ],
        ephemeral: true,
      })
      .catch(() => {});
  },
};
