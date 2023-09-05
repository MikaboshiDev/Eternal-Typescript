import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';

export default new Command(
   new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!')
      .setDMPermission(false),
   async (client, interaction) => {
      const embed = new EmbedBuilder()
         .setTitle('Pong!')
         .setDescription(`🏓 Latency is ${Date.now() - interaction.createdTimestamp}ms.`)
         .setColor('Random');
      await interaction.reply({ embeds: [embed] });
   }
);
