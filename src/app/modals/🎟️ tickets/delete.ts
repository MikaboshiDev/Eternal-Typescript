import axios from 'axios';
import { createTranscript } from 'discord-html-transcripts';
import Discord, { EmbedBuilder } from 'discord.js';
import fs from 'fs';
import model from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  id: 'modal_ticket_delete',
  async execute(interaction: any, client: any) {
    const { options, channel, guild, member } = interaction;
    const embed = new EmbedBuilder();
    const value_razon = interaction.fields.getTextInputValue('modal_delete');

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
      poweredBy: true,
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
          .catch(() => {
            logWithLabel('discord', `The user ${creador.tag} has blocked me`);
          });
      });

    interaction.reply({ embeds: [embed] });
    setTimeout(() => channel.delete().then(() => DB.deleteOne({ ChannelID: channel.id })), 5 * 1000);
    const nombreArchivo = `transcript-${interaction.channel.id}-${data.TicketID}.html`;
    const attachmentURL = transcript.setFile.toString();
    const rutaGuardar = './upload/transcripts/';

    const rutaCompleta = `${rutaGuardar}${nombreArchivo}`;
    axios({
      url: attachmentURL,
      responseType: 'stream',
    }).then((response) => {
      response.data
        .pipe(fs.createWriteStream(rutaCompleta))
        .on('finish', () => {
          logWithLabel('discord', `The archive was saved successfully in ${rutaCompleta}`);
        })
        .on('error', (err: any) => {
          logWithLabel('discord', `Error saving file: ${err}`);
        });
    });
  },
};
