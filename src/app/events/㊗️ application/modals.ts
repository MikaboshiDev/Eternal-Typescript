import { EmbedBuilder, InteractionType } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { Event } from '../../../class/builders';
import { client } from '../../../shulker';
import { Modals } from '../../../../global';

export default new Event('interactionCreate', async (interaction: any) => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  const embed = new EmbedBuilder()
    .setAuthor({ name: `Command Control`, iconURL: interaction.user.displayAvatarURL() })
    .setThumbnail(client.user?.displayAvatarURL() ?? '')
    .setColor('Red');

  const modals: Modals = client.modals.get(interaction.customId) as Modals;
  if (!modals || modals === undefined) return;

  if (modals.owner && interaction.user.id !== client.config.dashboard.owner_id)
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this command because it's only for the owner of the bot.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (modals.premium && !interaction.guild?.premiumSubscriptionCount)
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this command because it's only for premium servers.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (modals.permissions && !interaction.member?.permissions.has(modals.permissions))
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this command because you don't have the necessary permissions.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (modals.botpermissions && !interaction.guild?.members.me.permissions.has(modals.botpermissions))
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this command because you don't have the necessary permissions.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (modals.ticketMod && !interaction.guild?.members.me.permissions.has('ManageChannels'))
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You need support roles to be able to handle server tickets`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  modals.execute(interaction, client);
});
