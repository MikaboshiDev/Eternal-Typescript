import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'reopen-ticket',
  async execute(interaction: any, client: any) {
            const { options, channel, guild, member } = interaction;
            const embed = new EmbedBuilder();

            const ticketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
            if (!ticketSetup) {
              embed
                .setColor('Red')
                .setTitle('Ticket System! 🔴')
                .setDescription(
                  [
                    `\`👤\` Reason: No data found in the database.`,
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
                  [`\`👤\` Reason: No previous data saved.`, `\`⭐\` Date: ${new Date().toLocaleDateString()}`].join(
                    '\n'
                  )
                );
              return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (data.Closed === true) {
              embed
                .setColor('Red')
                .setTitle('Ticket System! 🔴')
                .setDescription(
                  [
                    `\`👤\` Reason: This ticket is already open.`,
                    `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
                  ].join('\n')
                );
              return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            await DB.updateOne({ ChannelID: channel.id }, { Closed: false });

            client.channels.cache.get(data.ChannelID).permissionOverwrites.edit(data.CreatedBy, {
              ViewChannel: true,
            });

            embed
              .setColor('Green')
              .setTitle('Ticket Open Done!')
              .setThumbnail(interaction.guild.iconURL({ forceStatic: true }))
              .setDescription(
                [
                  `\`🔥\` Self Code Access: N/A`,
                  `\`⌛\` Opened By: <@${member.id}>`,
                  `\`⏱️\` Open At: ${new Date().toLocaleString()}`,
                  `\`🌊\` Ticket Closed Num: ${data.TicketID}`,
                ].join('\n')
              )
              .setFooter({
                text: `Ticket Opened By: ${member.id}`,
                iconURL: interaction.guild.iconURL({ forceStatic: true }),
              });

            const info = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setLabel('Close Ticket')
                .setCustomId('close-ticket'),
              new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setLabel('Ticket Details')
                .setCustomId('datos_ticket')
            );
            interaction.reply({ embeds: [embed], components: [info] }).then(() => {
              const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setLabel('Close Ticket')
                  .setDisabled(true)
                  .setCustomId('close-ticket'),
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Secondary)
                  .setLabel('Ticket Details')
                  .setDisabled(true)
                  .setCustomId('datos_ticket')
              );
              setTimeout(() => {
                interaction.editReply({ embeds: [embed], components: [row] });
              }, 60000); 
            });
  },
};
