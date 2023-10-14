import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import Profile from '../../../models/tickets/perfil';
import emojis from '../../../../config/emojis.json';
import DB from '../../../models/tickets/system';
import Discord from "discord.js";

module.exports = {
  id: 'modal_ticket_cerrar',
  async execute(interaction: any, client: any) {
            const value_name = interaction.fields.getTextInputValue('modal_close');
            const { options, channel, guild, member } = interaction;
            const embed = new EmbedBuilder();

            const ticketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
            if (!ticketSetup) {
              embed
                .setColor('Red')
                .setTitle('Ticket System! 🔴')
                .setDescription([`\`👤\` Reason: No data found in the database.`].join('\n'));
              return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (!interaction.member.roles.cache.has(ticketSetup.Handlers))
              return interaction.reply({
                content: [
                  `\`👤\` Reason: You don't have the support role to claim this ticket, sorry.`,
                  `day If you think this is an error, contact the server administrators.`,
                ].join('\n'),
                ephemeral: true,
              });

            const data = await DB.findOne({ ChannelID: channel.id });
            if (!data) {
              embed
                .setColor('Red')
                .setTitle('Ticket System! 🔴')
                .setDescription([`\`👤\` Reason: No previous data found.`].join('\n'));
              return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (data.Closed === true) {
              embed
                .setColor('Red')
                .setTitle('Ticket System! 🔴')
                .setDescription([`\`👤\` Reason: This channel has already been closed for a while.`].join('\n'));
              return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            await DB.updateOne({ ChannelID: channel.id }, { Closed: false });

            client.channels.cache.get(data.ChannelID).permissionOverwrites.edit(data.CreatedBy, {
              ViewChannel: false,
            });

            embed
              .setColor('Green')
              .setTitle('Ticket Closed Done!')
              .setThumbnail(interaction.guild.iconURL({ forceStatic: true }))
              .setDescription(
                [
                  `\`👤\` **Moderator:** ${interaction.user} (\`${interaction.user.id}\`)`,
                  `\`🔥\` **Closure Reason:** ${value_name ? value_name : `No closure reason provided`}`,
                ].join('\n')
              )
              .setFooter({
                text: `Ticket Closed By: ${member.id}`,
                iconURL: interaction.guild.iconURL({ forceStatic: true }),
              });

            const info = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Success)
                .setLabel('Reopen Ticket')
                .setCustomId('reopen-ticket'),
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Secondary)
                .setLabel('Dates Ticket')
                .setCustomId('datos_ticket')
            );

            interaction.reply({ embeds: [embed], components: [info] }).then(() => {
              const row = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setStyle(Discord.ButtonStyle.Success)
                  .setLabel('Reopen Ticket')
                  .setDisabled(true)
                  .setCustomId('reopen-ticket'),
                new Discord.ButtonBuilder()
                  .setStyle(Discord.ButtonStyle.Secondary)
                  .setLabel('Dates Ticket')
                  .setDisabled(true)
                  .setCustomId('datos_ticket')
              );
              setTimeout(() => {
                interaction.editReply({ embeds: [embed], components: [row] });
              }, 60000); 
            });
  },
};
