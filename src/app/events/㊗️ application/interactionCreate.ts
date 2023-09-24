import { Collection, EmbedBuilder, GuildMemberRoleManager, GuildMember, Role } from 'discord.js';
const cooldowns = new Map<string, Map<string, number>>();
import emojis from '../../../../config/emojis.json';
import { Event } from '../../../class/builders';
import { client } from '../../../index';

/* The code is exporting a new instance of an event listener for the 'interactionCreate' event. This
event listener is a callback function that is executed whenever an interaction (such as a slash
command) is created. */
export default new Event('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand() || !interaction.channel) return;
  const command = client.commands.get(interaction.commandName);
  const { member } = interaction;
  if (!command) return;

  const embed = new EmbedBuilder()
    .setAuthor({ name: `Command Control`, iconURL: interaction.user.displayAvatarURL() })
    .setThumbnail(client.user?.displayAvatarURL() ?? '')
    .setColor('Red');

  if (command.options?.owner && interaction.user.id !== process.env.owner_id)
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

  if (command.options?.premium && !interaction.guild?.premiumSubscriptionCount)
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

  if (command.options?.cooldown) {
    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = command.options.cooldown * 1000;

    if (timestamps?.has(interaction.user.id)) {
      const timestamps = cooldowns.get(command.name);
      const expirationTime = timestamps?.get(interaction.user?.id) ?? 0 + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return interaction.reply({
          embeds: [
            embed.setDescription(
              [
                `${emojis.error} You are on cooldown for this command.`,
                `Please wait **${timeLeft.toFixed(1)}** more second(s) before using this command again.`,
              ].join('\n')
            ),
          ],
        });
      }
    }

    timestamps?.set(interaction.user.id, now);
    setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);
  }

  command.run(client, interaction, client.paypal);
});
