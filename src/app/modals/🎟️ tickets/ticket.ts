import Discord, { ActionRowBuilder, ButtonStyle, ChannelType, EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';
module.exports = {
  id: 'modal_ticket_cores',
  async execute(interaction: any, client: any) {
    const embed = new EmbedBuilder();

    const value_razon = interaction.fields.getTextInputValue('modal_razon');
    const value_category = interaction.fields.getTextInputValue('modal_category');
    const value_links = interaction.fields.getTextInputValue('modal_archive');
    const data = await model.findOne({ GuildID: interaction.guild.id });

    if (!data) {
      embed
        .setColor('Red')
        .setTitle('Ticket System')
        .setDescription(
          [
            `The ticket system has not been configured on the server yet, please contact the server administrators.`,
            `please contact the server administrators.`,
          ].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true }).catch((err: any) => {});
    }

    if (!interaction.guild.members.me.permissions.has('ManageChannels')) {
      embed
        .setTitle('Ticket System')
        .setDescription(
          [
            `I don't have permissions to create channels in the Discord server.`,
            `please give me the permissions to create channels.`,
          ].join('\n')
        );
      return interaction.reply({ embeds: [embed], ephemeral: true }).catch((err: any) => {});
    }

    await interaction.guild.channels
      .create({
        name: '📌' + '︰' + interaction.user.username + interaction.user.discriminator,
        type: ChannelType.GuildText,
        topic: `Ticket ${interaction.user.tag}, ID: ${
          interaction.user.id
        }, Date: ${new Date().toLocaleDateString()}, Hours: ${new Date().toLocaleTimeString()}`,
        parent: data.Category,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: [
              'ViewChannel',
              'SendMessages',
              'AddReactions',
              'ReadMessageHistory',
              'AttachFiles',
              'EmbedLinks',
              'UseApplicationCommands',
            ],
          },
          {
            id: data.Handlers,
            allow: ['ViewChannel', 'AddReactions', 'ReadMessageHistory', 'AttachFiles', 'EmbedLinks'],
            deny: ['SendMessages', 'UseApplicationCommands'],
          },
          {
            id: interaction.guild.roles.everyone.id,
            deny: ['ViewChannel'],
          },
        ],
      })
      .then(async (channel: any) => {
        await DB.create({
          GuildID: interaction.guild.id,
          MembersID: interaction.member.id,
          TicketID: data.IDs ? data.IDs + 1 : 1,
          ChannelID: channel.id,
          Closed: false,
          CreatedBy: interaction.member.id,
          Opened: Date.now().toString(),
        }).catch((err) => {});

        await model.findOneAndUpdate({ GuildID: interaction.guild.id }, { IDs: data.IDs ? data.IDs + 1 : 1 });

        channel.setRateLimitPerUser(2);

        embed
          .setAuthor({
            name: `🎟️ Welcome to your Personal Ticket`,
            iconURL: interaction.user.avatarURL({ forceStatic: true }),
          })
          .setDescription(
            [
              `\`⌛\` **Category:** ${value_category}`,
              `\`⛔\` **Creator:** ${interaction.user.tag}`,
              `\`🔓\` **Reason** ${value_razon ? value_razon : `${emojis.error} Not specified by the ticket creator.`}`,
              `\`🔓\` **Links:** ${
                value_links ? value_links : `${emojis.error} Not specified by the ticket creator.`
              }\n`,
              `\`👋🏼\` Thank you for creating a general support ticket. Our staff team will assist you shortly.`,
              `\`⏰\` Our standard support hours are between 1 PM and 4 AM UTC time (8:00 AM and 11:00 PM local time).`,
            ].join('\n')
          )
          .setColor('Random')
          .setImage(client.config.img.tickets.one)
          .setFooter({
            text: `Support Server and Server Services`,
            iconURL: interaction.user.avatarURL({ forceStatic: true }),
          })
          .setTimestamp();

        const buttons = new ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Primary)
            .setLabel('Delete Ticket')
            .setEmoji('🗑️')
            .setCustomId('delete-ticket'),
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Success)
            .setLabel('Reopen Ticket')
            .setEmoji('🔓')
            .setCustomId('reopen-ticket'),
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Primary)
            .setLabel('Close Ticket')
            .setEmoji('🔒')
            .setCustomId('close-ticket'),
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Success)
            .setLabel('Rename Ticket')
            .setEmoji('📝')
            .setCustomId('renombrar_ticket')
        );

        const support = new ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Success)
            .setLabel('Claim Ticket')
            .setEmoji('📌')
            .setCustomId('claim-ticket'),
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Primary)
            .setLabel('Renunce Ticket')
            .setEmoji('💱')
            .setCustomId('unclaim-ticket'),
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Success)
            .setLabel('Dates Ticket')
            .setEmoji('📅')
            .setCustomId('datos_ticket'),
          new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Primary)
            .setLabel('Danger Ticket')
            .setEmoji('🛑')
            .setCustomId('prioridad_ticket')
        );

        channel
          .send({
            content: `Hello! You will soon be attended by our staff. Thank you for opening a ticket with us: <@&${data.Handlers}> <@${interaction.user.id}>`,
            embeds: [embed],
            components: [buttons, support],
          })
          .then((msg: any) => {
            msg.pin(`New Ticket - ${interaction.user.tag}`).catch((err: any) => {});
          })
          .catch((err: any) => {});

        const response = new EmbedBuilder()
          .setColor('Green')
          .setTitle('New Ticket')
          .setTimestamp()
          .setFooter({
            text: 'Server Ticket System',
            iconURL: interaction.user.avatarURL({ forceStatic: true }),
          })
          .setDescription(`Ticket has been created in: ${channel}`);

        const link = new ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Ticket Open').setURL(channel.url)
        );

        interaction.reply({ embeds: [response], components: [link], ephemeral: true }).catch((err: any) => {});
      })
      .catch((e: any) => {
        console.log(e);
        const error = new EmbedBuilder()
          .setTitle('Ticket System! 🔴')
          .setDescription(
            [
              `\`👤\` Reason: An error occurred while creating the ticket channel. Please check the bot's console.`,
              `\`⭐\` Date: ${new Date().toLocaleDateString()}`,
            ].join('\n')
          );
        interaction.reply({ embeds: [Error], ephemeral: true });
      });
  },
};
