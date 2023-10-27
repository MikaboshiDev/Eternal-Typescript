import { EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { Event } from '../../../class/builders';
import { Buttons } from '../../../interface/buttons';
import { client } from '../../../shulker';

export default new Event('interactionCreate', async (interaction: any) => {
  if (!interaction.isButton()) return;

  const embed = new EmbedBuilder()
    .setAuthor({ name: `Command Control`, iconURL: interaction.user.displayAvatarURL() })
    .setThumbnail(client.user?.displayAvatarURL() ?? '')
    .setColor('Red');

  const button = client.buttons.get(interaction.customId);
  if (!button || button === undefined) return;

  if ((button as Buttons).owner && interaction.user.id !== process.env.owner_id)
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

  if ((button as Buttons).premium && !interaction.guild?.premiumSubscriptionCount)
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

  if ((button as Buttons).permissions && !interaction.member?.permissions.has((button as Buttons).permissions))
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
    (button as Buttons).botpermissions &&
    !interaction.guild?.members.me.permissions.has((button as Buttons).botpermissions)
  )
    return interaction.reply({
      embeds: [
        embed.setDescription(
          [
            `${emojis.error} I don't have permission to use this command because I don't have the necessary permissions.`,
            `If you think this is an error, please contact the owner of the bot.`,
          ].join('\n')
        ),
      ],
    });

  if ((button as Buttons).ticketMod && !interaction.guild?.members.me.permissions.has('ManageChannels'))
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

  (button as Buttons).execute(interaction, client);
});
