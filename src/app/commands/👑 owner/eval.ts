import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import emojis from "../../../../config/emojis.json";
import { Command } from '../../../class/builders';

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
    if (!code) return interaction.reply({
        content: [
            `${emojis.error} Please provide code to evaluate ${interaction.user}`,
            `Example: \`/eval 1 + 1\``,
        ].join('\n'),
    });

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
        return interaction.reply({
            content: [
                `${emojis.error} An error occured while evaluating the code ${interaction.user}`,
                `\`\`\`js\n${err}\`\`\``,
            ].join('\n'),
        });
    }
   }
);
