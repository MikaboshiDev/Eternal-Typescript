import { Collection, EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { Event } from '../../../class/builders';
import { client } from '../../../shulker';
const cooldowns = new Map();

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

  if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
  const curtime = Date.now();
  const timestamp = cooldowns.get(command.name);
  const coolamount = command.cooldown * 1000;
  if (timestamp.has(interaction.user.id)) {
    const expiration = timestamp.get(interaction.user.id) + coolamount;

    if (curtime < expiration) {
      const timeleft = (expiration - curtime) / 1000;
      return interaction.reply({
        content: [
          `${emojis.error} You are on cooldown for this command.`,
          `Please wait ${timeleft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
        ].join("\n")
      })
    }
  }

  timestamp.set(interaction.user.id, curtime);
  setTimeout(() => timestamp.delete(interaction.user.id), coolamount);
  command.run(client, interaction, client.paypal);
});
