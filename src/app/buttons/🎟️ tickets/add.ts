import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'agregar_usuario',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();

    const ticketSetup = await TicketSetupData.findOne({ GuildID: guild?.id });
    if (!ticketSetup) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [
            `\`👤\` Reason: No saved data found in the database.`,
            `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
          ].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const data = await DB.findOne({ ChannelID: channel.id });
    if (!data) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [`\`👤\` Reason: No previous saved data.`, `\`⭐\` Date: ${new Date().toLocaleDateString()}`].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const reply = await interaction.reply({
      embeds: [
        new EmbedBuilder().setTitle(`Add User!`).setDescription(`Enter the ID of the user to add.`).setColor('Red'),
      ],
      ephemeral: true,
    });

    const filter = (m: any) => m.author.id === interaction.user.id;
    const collector = channel.createMessageCollector({ filter, time: 60000, max: 1 });
    collector.on('collect', async (m: any) => {
      const existingUser = interaction.guild.members.cache.get(m.content);
      if (!existingUser) {
        m.delete();
        embed
          .setTitle(`Add User! 🔴`)
          .setColor('Red')
          .setDescription(
            [
              `\`👤\` Reason: The user does not exist in the server.`,
              `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
            ].join('\n')
          );
        return interaction.editReply({ embeds: [embed], ephemeral: true });
      }

      if (channel.permissionOverwrites.cache.has(existingUser.id)) {
        m.delete();
        embed
          .setTitle(`Add User! 🔴`)
          .setColor('Red')
          .setDescription(
            [
              `\`👤\` Reason: The user can already see this channel.`,
              `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
            ].join('\n')
          );
        return interaction.editReply({ embeds: [embed], ephemeral: true });
      }

      await channel.permissionOverwrites.create(existingUser.id, {
        ViewChannel: true,
      });
      m.delete();
      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Add User! 🟢`)
            .setColor('Green')
            .setDescription(
              [
                `\`👤\` Reason: The user has been added to this channel.`,
                `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
              ].join('\n')
            ),
        ],
        ephemeral: true,
      });
      collector.stop();
    });
  },
};
