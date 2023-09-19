import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';

export default new Command(
    new SlashCommandBuilder()
        .setName('botinfo')
        .setDMPermission(false)
        .setDescription('Replies with Bot Info! (WIP)'),
    async (client, interaction) => {
            const apiLatency = `${client.ws.ping} ms`;

            setTimeout(async () => {
               const embed = new EmbedBuilder()
                  .setColor('Green')
                  .setTitle('Bot Info')
                  .setDescription('Here is some information about me!')
                  .addFields(
                     {
                        name: 'Bot ID',
                        value: interaction.client.user.id,
                        inline: true,
                     },
                     {
                        name: 'Server Count',
                        value: interaction.client.guilds.cache.size.toString(),
                        inline: true,
                     },
                     {
                        name: 'User Count',
                        value: interaction.client.users.cache.size.toString(),
                        inline: true,
                     },
                     { name: 'Library', value: 'Discord.js', inline: true },
                     {
                        name: 'Version',
                        value: `v${process.env.botVersion}`,
                        inline: true,
                     },
                     {
                        name: 'Creator',
                        value: `<@679560282929889331>`,
                        inline: true,
                     },
                     { name: `API Latency`, value: apiLatency, inline: true },
                     {
                        name: `Client Latency`,
                        value: `${
                           interaction.createdTimestamp - Date.now()
                        } ms`,
                        inline: true,
                     }
                  )
                  .setThumbnail(
                     interaction.client.user.displayAvatarURL({
                        forceStatic: true,
                     })
                  );

               await interaction.reply({ embeds: [embed] });
            }, 1000);
    }
);