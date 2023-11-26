import { EmbedBuilder, PermissionResolvable } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { Event } from '../../../class/builders';
import { client } from '../../../shulker';
import { Menus } from '../../../../global';

export default new Event('interactionCreate', async (interaction: any) => {
  if (!interaction.isStringSelectMenu()) return;
  const embed = new EmbedBuilder()
    .setAuthor({ name: `Command Control`, iconURL: interaction.user.displayAvatarURL() })
    .setThumbnail(client.user?.displayAvatarURL() ?? '')
    .setColor('Red');

  const menus: Menus = client.menus.get(interaction.customId) as Menus;
  if (!menus || menus === undefined) return;

  if (menus.owner && interaction.user.id !== client.config.dashboard.owner_id)
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this menu because it's only for the owner of the bot.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (menus.premium && !interaction.guild?.premiumSubscriptionCount)
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this menu because it's only for premium servers.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (menus.permissions && !interaction.member?.permissions.has(menus.permissions as PermissionResolvable))
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} You don't have permission to use this menu because you don't have the necessary permissions.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (
    menus.botpermissions &&
    !interaction.guild?.members.me.permissions.has(menus.botpermissions as PermissionResolvable)
  )
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} I don't have permission to use this menu because I don't have the necessary permissions.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if (menus.ticketMod && !interaction.guild?.members.me.permissions.has('ManageChannels'))
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

  menus.execute(interaction, client);
});
