import { EmbedBuilder } from 'discord.js';

module.exports = {
  id: 'add_user_ticket',
  async execute(interaction: any, client: any) {
    const user = interaction.values();
    if (interaction.channel.permissionOverwrites.cache.has(user.id))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('Ticket System')
            .setDescription(
              [
                `The user ${user} is already on the ticket at this time`,
                `please select someone else from the menu`,
              ].join('\n')
            ),
        ],
      });

    await interaction.channel.permissionOverwrites.create(user.id, {
      ViewChannel: true,
    });

    interaction.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Ticket System')
          .setDescription(
            [`The user ${user} has been added to the ticket`, `Now you can chat with him in the ticket`].join('\n')
          ),
      ],
      ephemeral: true,
    });
  },
};
