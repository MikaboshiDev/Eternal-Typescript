import Discord, { EmbedBuilder } from 'discord.js';
import model from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  id: 'modal_ticket_cerrar',
  async execute(interaction: any, client: any) {
    const value_name = interaction.fields.getTextInputValue('modal_close');
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
