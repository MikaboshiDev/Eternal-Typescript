import { EmbedBuilder } from 'discord.js';

module.exports = {
  id: 'Review-Ticket',
  async execute(interaction: any, client: any) {
    const a = interaction.fields.getTextInputValue(`Mensaje`);
    const b = interaction.fields.getTextInputValue(`Calificacion`);
    let stars = '⭐';

    const number = ['1', '2', '3', '4', '5'];
    const star = number[Math.floor(Math.random() * number.length)];

    if (star === '1') {
      stars = '⭐';
    } else if (star === '2') {
      stars = '⭐⭐';
    } else if (star === '3') {
      stars = '⭐⭐⭐';
    } else if (star === '4') {
      stars = '⭐⭐⭐⭐';
    } else if (star === '5') {
      stars = '⭐⭐⭐⭐⭐';
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `We have received a new review for Night Support`,
        iconURL: client.user.avatarURL(),
      })
      .addFields(
        {
          name: '📌 Critic',
          value: `> ${interaction.user.username}\n> (\`${interaction.user.id}\`)`,
          inline: true,
        },
        { name: '🕧 Support', value: `> ${client.user.username}\n> (\`${client.user.id}\`)`, inline: true },
        { name: '⭐ Stars', value: `> ${stars}` },
        { name: '📝 Review', value: `> ${a}` }
      )
      .setTimestamp()
      .setThumbnail(interaction.user.avatarURL())
      .setFooter({
        text: `A new review from our support team appeared`,
        iconURL: client.user.avatarURL(),
      })
      .setColor(`Random`);

    await interaction.reply({
      content: [
        `The Support Ticket review has been sent to the server. Thank you for trusting us.`,
        `If you have any questions, feel free to reach out to our support anytime.`,
      ].join('\n'),
    });
    client.channels.cache.get(client.config.setups.reviews).send({ embeds: [embed] });
  },
};
