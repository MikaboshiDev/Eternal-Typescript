import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';

export default new Command(
   new SlashCommandBuilder()
      .setName('support')
      .setDescription('Get support from the bot developers')
      .setDMPermission(false),
   async (client, interaction) => {
      const web = ' http://www.night-support.xyz/';
      const embed = new EmbedBuilder()
         .setAuthor({
            name: 'Night Support',
            iconURL: client.user?.displayAvatarURL({ forceStatic: true }),
         })
         .setTitle('Support')
         .setDescription(
            [
               `Enter our discord server for related support`,
               `**Link:** http://discord.gg/pgDje8S3Ed`,
            ].join('\n')
         )
         .setFooter({
            text: 'Night Support',
            iconURL: interaction.user.displayAvatarURL({ forceStatic: true }),
         })
         .setTimestamp();

        await interaction.reply({ embeds: [embed] });
   }
);
