import axios from 'axios';
import { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';

const Api_Url = 'https://discord.com/api/v10';

module.exports = {
  botpermissions: ['ManageGuild'],
  permissions: ['ManageGuild'],
  id: 'premium_automod_menu',
  async execute(interaction: any, client: any) {
    if (interaction.values.includes('first_option')) {
    } else if (interaction.values.includes('second_option')) {
      const a = new TextInputBuilder()
        .setPlaceholder('Enter the id moderation rule')
        .setLabel('You can get it with the command /automod list')
        .setCustomId('premium_automod_modal_id')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const b = new ActionRowBuilder().addComponents(a);
      const modal = new ModalBuilder()
        .setCustomId('premium_automod_modal')
        .setTitle('AutoModeracion - Actions')
        .addComponents(b as any);

      interaction.showModal(modal).catch((e: any) => {
        logWithLabel('error', `Error showing modal ${e}`);
        console.error(e);
      });
    } else if (interaction.values.includes('third_option')) {
      const response = await axios({
        method: 'get',
        url: `${Api_Url}/guilds/${interaction.guild?.id}/auto-moderation/rules`,
        headers: {
          Authorization: `Bot ${client.config.general.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.data.length) {
        return interaction.reply({
          content: [
            `${emojis.error} There are no rules for self-moderation in this server`,
            `Please attempt to create one manually.`,
          ].join('\n'),
          ephemeral: true,
        });
      }

      const rules = response.data.map((rule: any) => rule.id);

      for (const rule of rules) {
        try {
          const delete_response = await axios({
            method: 'delete',
            url: `${Api_Url}/guilds/${interaction.guild?.id}/auto-moderation/rules/${rule}`,
            headers: {
              Authorization: `Bot ${client.config.general.token}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          logWithLabel('error', `Error deleting rule ${rule}`);
          console.error(error);
        }
      }

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(' AutoModeracion - Actions ')
            .setDescription(
              [
                `${emojis.correct} The self-moderation rules that you selected have been removed`,
                `These are the data related to the process:`,
              ].join('\n')
            )
            .addFields(
              { name: 'Time Action', value: `> ${new Date().toLocaleString()}`, inline: true },
              { name: 'Author', value: `> ${interaction.user.tag}`, inline: true },
              { name: 'Rules Deleted', value: `> ${rules.join(', ')}`, inline: false }
            )
            .setFooter({
              text: `Requested by ${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL(),
            }),
        ],
      });
    }
  },
};
