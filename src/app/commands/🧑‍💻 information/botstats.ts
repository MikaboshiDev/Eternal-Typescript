import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import { stripIndent } from 'common-tags';
import moment from 'moment';
import os from 'os';

export default new Command(
   new SlashCommandBuilder()
      .setName('botstats')
      .setDMPermission(false)
      .setDescription("Get the bot's stats (WIP) the in the form of an embed!"),
   async (client, interaction) => {
      const { user, guild } = interaction;
      const member = guild?.members.cache.get(user.id);
      const { guilds, channels, ws, uptime, commands } = client;

      const d = moment.duration(uptime);
      const days = `${d.days()} day${d.days() == 1 ? '' : 's'}`;
      const hours = `${d.hours()} hour${d.hours() == 1 ? '' : 's'}`;

      const clientStats = stripIndent`
      Servers   :: ${guilds.cache.size}
      Users     :: ${guilds.cache.reduce(
         (acc, guild) => acc + guild.memberCount,
         0
      )}
      Channels  :: ${channels.cache.size}
      WS Ping   :: ${Math.round(ws.ping)}ms
      Uptime    :: ${days} and ${hours}
    `;
      const serverStats = stripIndent`
      Platform  :: ${os.platform()}
      OS        :: ${os.release()}
      Arch      :: ${os.arch()}
      Hostname  :: ${os.hostname()}
      CPUs      :: ${[...new Set(os.cpus().map((x) => x.model))].join(',')}
      Cores     :: ${os.cpus().length.toString()}
      RAM Total :: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
      RAM Free  :: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
      RAM Usage :: ${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%
      Uptime    :: ${days} and ${hours}
    `;

      const embed = new EmbedBuilder()
         .setTitle(
            `${
               guild?.members.me?.displayName ?? client.user?.username
            }'s Statistics`
         )
         .setColor('Aqua')
         .addFields([
            {
               name: 'Commands',
               value: `\`${commands.size}\` commands`,
               inline: true,
            },
            {
               name: 'Bot Stats',
               value: `\`\`\`asciidoc\n${clientStats}\`\`\``,
            },
            {
               name: 'Host Stats',
               value: `\`\`\`asciidoc\n${serverStats}\`\`\``,
            },
         ])
         .setFooter({
            text: member?.displayName ?? user.username,
            iconURL: member?.displayAvatarURL() ?? user.displayAvatarURL(),
         })
         .setTimestamp();

      await interaction.reply({ embeds: [embed] });
   }
);
