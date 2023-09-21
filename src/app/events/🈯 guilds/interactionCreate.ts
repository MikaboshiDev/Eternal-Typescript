import { embed } from '../../../utils/function';
import { Event } from '../../../class/builders';
import { EmbedBuilder } from 'discord.js';
import { client } from '../../../index';
import fs from 'fs';

export default new Event('interactionCreate', async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'helpMenu') {
      const selection = interaction.values[0];
      const commands = fs
        .readdirSync(`./src/app/commands/${selection}`)
        .filter((file: string) => file.endsWith('.ts'))
        .join(' ')
        .split('.ts');

      function capitalizeFL(str: any) {
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Command list for ${selection}`)
        .setDescription(`\`\`\`${commands}\`\`\``)
        .setColor('Random')
        .addFields({
          name: 'Command Count',
          value: `${commands.length - 1} command(s)`,
        });

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  }
});
