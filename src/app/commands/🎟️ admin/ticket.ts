import {
  ActionRowBuilder,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  TextChannel,
} from 'discord.js';
import TicketSetupData from '../../../models/tickets/setup';
import { logWithLabel } from '../../../utils/console';
import Profile from '../../../models/tickets/perfil';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';
import DB from '../../../models/tickets/system';
import Discord from 'discord.js';
export default new Command(
  new SlashCommandBuilder()
    .setName('tickets')
    .setDescription('Execute the advanced setup of private server tickets')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Choose the channel where I will publish the ticket setup')

        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName('category')
        .setDescription('Choose the category where we will open the tickets')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .addChannelOption((option) =>
      option
        .setName('transcription')
        .setDescription('Choose the channel where we will send the transcriptions')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addRoleOption((option) =>
      option.setName('managers').setDescription('Choose the role that can manage the server tickets').setRequired(true)
    ),
  async (client, interaction) => {
    const { guild, options } = interaction;

    const channel = options.getChannel('channel');
    const category = options.getChannel('category');
    const transcripts = options.getChannel('transcription');
    const helpers = options.getRole('managers');

    const selectMenuRow = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('ticket-system')
        .setPlaceholder('Select one of the options from the menu')
        .addOptions(
          {
            label: 'Minecraft',
            description: 'Problems related to the minecraft server',
            value: 'minecraft',
            emoji: emojis.menus.tickets.option_1,
          },
          {
            label: 'Discord',
            description: 'Problems related to the discord server',
            value: 'discord',
            emoji: emojis.menus.tickets.option_2,
          },
          {
            label: 'Bot',
            description: 'Problems related to the bot',
            value: 'bot',
            emoji: emojis.menus.tickets.option_3,
          },
          {
            label: 'Support',
            description: 'Problems related to the bot',
            value: 'support',
            emoji: emojis.menus.tickets.option_8,
          }
        )
    );

    const embed = new EmbedBuilder()
      .setAuthor({ name: '⚙️ Discord Remote Consulting and Services', iconURL: client.user?.displayAvatarURL() })
      .setFooter({ text: `Support Bots Discord`, iconURL: interaction.guild?.iconURL() as any })
      .setTimestamp()
      .setThumbnail(interaction.guild?.iconURL() as any)
      .setDescription(
        [
          `\`⚙️\` Open a ticket if you need support related to problems only`,
          `> with the bot, we do not support plugins or modifications by the `,
          `> user, please consider using for non-technical purposes.\n`,
          `\`🌊\` If you have doubts or questions related to systems, commands,`,
          `> functions that the bots of the group have, do not hesitate to open a ticket in it`,
          `> lower menu for more reports.`,
        ].join('\n')
      );

    const channel_text = guild?.channels?.cache.get(channel?.id as any);
    if (!channel_text)
      return interaction.reply({ content: `${emojis.error} The channel was not found`, ephemeral: true });

    (channel_text as TextChannel)
      .send({ embeds: [embed], components: [selectMenuRow as any] })
      .then(async () => {
        await DB.findOneAndUpdate(
          { GuildID: guild?.id },
          {
            ChannelID: channel?.id,
            Category: category?.id,
            Transcripts: transcripts?.id,
            Handlers: helpers?.id,
            IDs: 0,
          },
          {
            new: true,
            upsert: true,
          }
        );

        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor('Random')
              .setDescription(` ${emojis.correct} The ticket system is fully configured on our server.`),
          ],
          ephemeral: true,
        });
      })
      .catch((e: any) => {
        const errorEmbed = new EmbedBuilder()
          .setColor('Random')
          .setDescription(
            `${emojis.error} An error occurred while configuring the ticket system on the discord server`
          );
        interaction.reply({ embeds: [errorEmbed] }).then(() => {
          console.log(e);
        });
      });
  }
);
