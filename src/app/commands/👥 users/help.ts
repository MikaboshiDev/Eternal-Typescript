import { ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import fs from 'fs';

export default new Command(
  new SlashCommandBuilder().setName('help').setDescription('Sends the command list!').setDMPermission(false),
  async (client, interaction) => {
    const dirs = fs.readdirSync('./src/app/commands');
    const slashCommands = await client.application?.commands.fetch();
    const embedMsg = new EmbedBuilder()
      .setTitle('Help Command')
      .setDescription('Select an option to get the command list of. Only one option can be selected.')
      .addFields(
        {
          name: 'Total Command Categories',
          value: `${dirs.length - 1}`,
          inline: true,
        },
        {
          name: 'Total Slash Commands',
          value: `${slashCommands?.size}`,
          inline: true,
        }
      )
      .setColor('Random');

    let helpMenu = new StringSelectMenuBuilder().setCustomId('helpMenu').setMaxValues(1).setMinValues(1).setPlaceholder('Select a category');

    fs.readdirSync('./src/app/commands').forEach((command) => {
      helpMenu.addOptions({
        label: `${command}`,
        description: `Command list for ${command}`,
        value: `${command}`,
      });
    });

    const menu = new ActionRowBuilder().addComponents(helpMenu);
    interaction.reply({ embeds: [embedMsg], components: [menu as any] });
  }
);
