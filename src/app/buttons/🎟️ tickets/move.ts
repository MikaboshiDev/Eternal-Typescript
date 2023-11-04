import { ChannelType, EmbedBuilder } from 'discord.js';
import model from '../../../models/tickets/setup';
import DB from '../../../models/tickets/system';

module.exports = {
  ticketMod: true,
  id: 'mover_ticket',
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

    const envio = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Mention the Category!`)
          .setDescription(`Enter the ID or mention the category where we will move it.`)
          .setColor('Red'),
      ],
      ephemeral: true,
    });

    const filter = (m: any) => m.author.id === interaction.user.id;
    const collector = channel?.createMessageCollector({ filter, time: 60000, max: 1 });
    collector?.on('collect', async (m: any) => {
      const category = m.mentions[0] || guild?.channels.cache.get(m.content);
      if (!category)
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`Invalid Category!`)
              .setDescription(`The mentioned category was not found.`)
              .setColor('Red'),
          ],
        });

      if (category.type !== ChannelType.GuildCategory)
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`Invalid Category!`)
              .setDescription(`The mentioned data is not a category of the Discord server. Please try again.`)
              .setColor('Red'),
          ],
        });

      await channel?.setParent(category.id);
      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Category Changed!`)
            .setDescription(
              `The ticket category has been changed to ${category.name} successfully. Thank you for your interaction.`
            )
            .setColor('Green'),
        ],
      });
      collector.stop();
    });
  },
};
