import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { Command } from '../../../class/builders';
import { exec } from 'child_process';

export default new Command(
  new SlashCommandBuilder()
    .setName('console')
    .setDescription('Run console commands.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption((option) =>
      option.setName('command').setDescription('The command to run in the console.').setRequired(true)
    )
    .setDMPermission(false),
  async (client, interaction) => {
    const userId = interaction.user.id;
    const command = interaction.options.getString('command');

    if (interaction.user.id !== process.env.owner_id!) {
      await interaction.reply('You do not have permission to run commands in the console.');
      return;
    }

    if (!command || command.includes('rm -rf')) {
      await interaction.reply('Dangerous commands are not allowed or the command is empty.');
      return;
    }

    try {
      const result = await executeSafely(command);
      const output = result ? result : 'No output';
      const response = `Command executed successfully:\n\`\`\`${output}\`\`\``;
      await interaction.reply(response);
    } catch (error) {
      await interaction.reply(`Error executing the command:\n\`\`\`${error ? error : 'Unknown error'}\`\`\``);
    }
  }
);

async function executeSafely(command: any) {
  return new Promise((resolve, reject) => {
    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        reject(error);
      } else {
        const output = (stdout || stderr || '').toString();
        resolve({ stdout: output });
      }
    });
  });
}
