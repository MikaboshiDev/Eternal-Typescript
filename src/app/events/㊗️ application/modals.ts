import { EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { Event } from '../../../class/builders';
import { Modals } from '../../../interface/modals';
import { client } from '../../../shulker';

export default new Event('interactionCreate', async (interaction: any) => {
  if (!interaction.isModalSubmit()) return;
  const embed = new EmbedBuilder()
    .setAuthor({ name: `Command Control`, iconURL: interaction.user.displayAvatarURL() })
    .setThumbnail(client.user?.displayAvatarURL() ?? '')
    .setColor('Red');

  const modals = client.modals.get(interaction.customId);
  if (!modals || modals === undefined) return;

  if ((modals as Modals).owner && interaction.user.id !== process.env.owner_id)
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

  if ((modals as Modals).premium && !interaction.guild?.premiumSubscriptionCount)
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

  if ((modals as Modals).permissions && !interaction.member?.permissions.has((modals as Modals).permissions))
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

  if (
    (modals as Modals).botpermissions &&
    !interaction.guild?.members.me.permissions.has((modals as Modals).botpermissions)
  )
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

  if ((modals as Modals).ticketMod && !interaction.guild?.members.me.permissions.has('ManageChannels'))
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

  (modals as Modals).execute(interaction, client);
});
