import emojis from '../../../../config/emojis.json';
import { Menus } from '../../../interface/menus';
import { Event } from '../../../class/builders';
import { EmbedBuilder } from 'discord.js';
import { client } from '../../../index';
import fs from 'fs';

export default new Event('interactionCreate', async (interaction) => {
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
            `${emojis.error} You don't have permission to use this command because it's only for the owner of the bot.`,
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
            `${emojis.error} You don't have permission to use this command because it's only for premium servers.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  (menus as Menus).execute(interaction, client);
});
