import emojis from '../../../../config/emojis.json';
import { Menus } from '../../../interface/menus';
import { Event } from '../../../class/builders';
import { EmbedBuilder, PermissionResolvable } from 'discord.js';
import { client } from '../../../index';
import fs from 'fs';

export default new Event('interactionCreate', async (interaction: any) => {
  if (!interaction.isStringSelectMenu()) return;
  const embed = new EmbedBuilder()
    .setAuthor({ name: `Command Control`, iconURL: interaction.user.displayAvatarURL() })
    .setThumbnail(client.user?.displayAvatarURL() ?? '')
    .setColor('Red');

  const menus = client.menus.get(interaction.customId);
  if (!menus || menus === undefined) return;

  if ((menus as Menus).owner && interaction.user.id !== process.env.owner_id)
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

  if ((menus as Menus).premium && !interaction.guild?.premiumSubscriptionCount)
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

  if (
    (menus as Menus).permissions &&
    !interaction.member?.permissions.has((menus as Menus).permissions as PermissionResolvable)
  )
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
    (menus as Menus).botpermissions &&
    !interaction.guild?.members.me.permissions.has((menus as Menus).botpermissions as PermissionResolvable)
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

  (menus as Menus).execute(interaction, client);
});
