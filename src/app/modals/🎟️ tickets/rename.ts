module.exports = {
  ticketMod: true,
  id: 'modal_ticket_rename',
  async execute(interaction: any, client: any) {
    const value_name = interaction.fields.getTextInputValue('modal_name');
    const channel = interaction.channel;

    await channel.setName(value_name);
    interaction.reply({
      content: [
        `The channel name has been changed to \`${value_name}\`. Thank you for interacting with us.`,
        `The interaction took ${Date.now() - interaction.createdTimestamp}ms.`,
      ].join('\n'),
    });
  },
};
