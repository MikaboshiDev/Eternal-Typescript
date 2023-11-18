import axios from 'axios';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';

const Api_Url = 'https://discord.com/api/v10';

module.exports = {
  id: 'premium_automod_modal',
  async execute(interaction: any, client: any) {
    const value = interaction.fields.getTextInputValue('premium_automod_modal_id');
    const response = await axios({
      method: 'get',
      url: `${Api_Url}/guilds/${interaction.guild?.id}/auto-moderation/rules/${value}`,
      headers: {
        Authorization: `Bot ${client.config.general.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.data) {
      interaction.reply({
        content: [
          `${emojis.error} The self-moderation rule that you selected does not exist`,
          `These are the data related to the process:`,
        ].join('\n'),
      });
    }

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('continue').setLabel('Delete').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId('cancel').setLabel('Cancel').setStyle(ButtonStyle.Primary)
    );

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('AutoModeracion - Actions')
          .setDescription(`\`\`\`json\n${JSON.stringify(response.data, null, 2)}\`\`\``)
          .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
          }),
      ],
      components: [buttons as any],
    });

    const filter = (i: any) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    collector.on('collect', async (i: any) => {
      if (i.customId === 'cancel') {
        return i.update({
          content: `${emojis.correct} The self-moderation rule that you selected has been removed`,
          embeds: [],
          components: [],
        });
      } else if (i.customId === 'continue') {
        const response = await axios({
          method: 'delete',
          url: `${Api_Url}/guilds/${interaction.guild?.id}/auto-moderation/rules/${value}`,
          headers: {
            Authorization: `Bot ${client.config.general.token}`,
            'Content-Type': 'application/json',
          },
        });

        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle('AutoModeracion - Actions')
              .setDescription(
                [
                  `${emojis.correct} The self-moderation rule that you selected has been removed`,
                  `These are the data related to the process:`,
                ].join('\n')
              )
              .addFields(
                { name: 'Time Action', value: `> ${new Date().toLocaleString()}`, inline: true },
                { name: 'Author', value: `> ${interaction.user.tag}`, inline: true },
                { name: 'Rule Deleted', value: `> ${value}`, inline: false }
              )
              .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
              }),
          ],
        });
      }
    });
  },
};
