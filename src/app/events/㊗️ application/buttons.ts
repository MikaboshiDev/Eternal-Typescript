import { Collection, EmbedBuilder, GuildMemberRoleManager, GuildMember, Role } from 'discord.js';
import { Buttons } from '../../../interface/buttons';
import emojis from '../../../../config/emojis.json';
import { Event } from '../../../class/builders';
import { client } from '../../../index';

export default new Event('interactionCreate', async (interaction) => {
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

  (button as Buttons).execute(interaction, client);
});
