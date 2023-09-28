import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import user from '../../../models/economy/user';
import fs from 'fs';
module.exports = {
  id: 'helpMenu',
  async execute(interaction: any, client: any) {
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
  },
};
