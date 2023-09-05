import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import { logWithLabel } from '../../../utils/console';

export default new Command(
   new SlashCommandBuilder()
      .setName('eval')
      .setDescription('Eval command interaction constract!')
      .setDMPermission(false)
      .addStringOption((option) =>
            option
                .setName('code')
                .setDescription('Code to evaluate')
                .setRequired(true)
        ),
   async (client, interaction) => {
    const code = interaction.options.getString('code');
    if (!code) return interaction.reply('Please provide a code to evaluate!');

    try {
        const evaluated = await eval(code);
        const output = typeof evaluated === 'string' ? evaluated : require('util').inspect(evaluated);
        const embed = new EmbedBuilder()
            .setTitle('Evaluated!')
            .setDescription(`\`\`\`js\n${output}\`\`\``)
            .setColor('Random');
        await interaction.reply({ embeds: [embed] });
    } catch (err) {
        logWithLabel("error", `${err}`)
        return interaction.reply(`Error while evaluating: \`${err}\``);
    }
   }
);
