import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { createTranscript } from 'discord-html-transcripts';
import TicketSetupData from '../../../models/tickets/setup';
import Profile from '../../../models/tickets/perfil';
import emojis from '../../../../config/emojis.json';
import DB from '../../../models/tickets/system';
import Discord from 'discord.js';
module.exports = {
  id: 'modal_ticket_delete',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();
    const value_razon = interaction.fields.getTextInputValue('modal_delete');
    const ticketSetup = await TicketSetupData.findOne({ GuildID: guild.id });
    if (!ticketSetup) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [`\`👤\` Reason: I don't have a database to work`, `\`⭐\` Date: ${new Date().toLocaleDateString()}`].join(
            '\n'
          )
        );
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
        .setDescription(
          [`\`👤\` Reason: No previously saved data.`, `\`⭐\` Date: ${new Date().toLocaleDateString()}`].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (data.Closed === true) {
      embed
        .setColor('Red')
        .setTitle('Ticket System! 🔴')
        .setDescription(
          [
            `\`👤\` Reason: This channel is already closed, please wait for it to be deleted.`,
            `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
          ].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

    embed
      .setColor('Green')
      .setTitle('Ticket Closed Records!')
      .setThumbnail(interaction.guild.iconURL({ forceStatic: true }))
      .setDescription(
        [
          `\`👤\` **Moderator:** ${interaction.user} (\`${interaction.user.id}\`)`,
          `\`🔥\` **Closure Reason:** ${value_razon ? value_razon : `🔴 No closure reason provided`}`,
        ].join('\n')
      )
      .setFooter({
        text: `Ticket Closed By: ${member.tag}`,
        iconURL: interaction.guild.iconURL({ forceStatic: true }),
      });

    const transcript = await createTranscript(interaction.channel, {
      limit: -1,
      filename: `transcript-${interaction.channel.id}-${data.TicketID}`,
    });

    await guild.channels.cache
      .get(ticketSetup.Transcripts)
      .send({
        content: `Ticket Closed: ${
          data.TicketID
        }, Date of Closure: ${new Date().toLocaleString()} at ${new Date().toLocaleTimeString()} by user: <@${
          member.id
        }> `,
        embeds: [embed],
        files: [transcript],
      })
      .then(() => {
        const creador = client.users.cache.get(data.CreatedBy);
        const botones = new Discord.ActionRowBuilder().addComponents(
          new Discord.StringSelectMenuBuilder()
            .setCustomId('reseñas')
            .setPlaceholder('Please select a rating from 1 to 5 ⭐ Stars')
            .addOptions(
              { label: '1 ⭐', description: 'Very poor support service to me', value: 'first_option' },
              { label: '2 ⭐', description: 'Poor support service to me', value: 'second_option' },
              { label: '3 ⭐', description: 'Average support service to me', value: 'third_option' },
              { label: '4 ⭐', description: 'Good support service to me', value: 'fourth_option' },
              { label: '5 ⭐', description: 'Excellent support service to me', value: 'fifth_option' }
            )
        );

        creador
          .send({
            content: `Hey! Thank you so much for opening a ticket with us :D. I hope the support was helpful to you. If you have any questions or suggestions, feel free to open a ticket again!`,
            embeds: [embed],
            components: [botones],
            files: [transcript],
          })
          .catch(() => {});
      });

    interaction.reply({ embeds: [embed] });
    setTimeout(() => channel.delete().then(() => DB.deleteOne({ ChannelID: channel.id })), 5 * 1000);
  },
};
