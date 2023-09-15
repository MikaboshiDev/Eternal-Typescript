import {
   SlashCommandBuilder,
   EmbedBuilder,
   ButtonStyle,
   ActionRowBuilder,
   ButtonBuilder,
} from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';
import superagent from 'superagent';
export default new Command(
   new SlashCommandBuilder()
      .setName('twith')
      .setDescription('💮 Investigate twith channels with these commands')
      .setDMPermission(false)
      .addStringOption((option) =>
         option
            .setName('user')
            .setDescription('User to give information')
            .setRequired(true)
      ),
   async (client, interaction) => {
      const { options, member } = interaction;
      const channelName = options.getString('user');
      if (!channelName) {
         return interaction.reply({
            content: [
               `${emojis.error} This command requires a channel name to search for the channel's stats.`,
               `Usage: \`/twitch <channel name>\``,
            ].join('\n'),
         });
      }

      try {
         const [Response, upTime, totalViews, accountage, lastGame, avatarimg] =
            await Promise.all([
               superagent.get(
                  `https://api.crunchprank.net/twitch/followcount/${channelName.toLowerCase()}`
               ),
               superagent.get(
                  `https://api.crunchprank.net/twitch/uptime/${channelName.toLowerCase()}`
               ),
               superagent.get(
                  `https://api.crunchprank.net/twitch/total_views/${channelName.toLowerCase()}`
               ),
               superagent.get(
                  `https://api.crunchprank.net/twitch/creation/${channelName.toLowerCase()}`
               ),
               superagent.get(
                  `https://api.crunchprank.net/twitch/game/${channelName.toLowerCase()}`
               ),
               superagent.get(
                  `https://api.crunchprank.net/twitch/avatar/${channelName.toLowerCase()}`
               ),
            ]);

         const embed = new EmbedBuilder()
            .setColor('#e100ff')
            .setTitle(`Twitch stats de: ${channelName}`)
            .setDescription(
               [
                  `❣️ **Followers**: ${Response.text}`,
                  `👀 **Views**: ${totalViews.text}`,
                  `⬆ **Uptime**: ${upTime.text}`,
                  `📝 **Created the**: ${accountage.text}`,
                  `⏮️ **Last game**: ${lastGame.text}`,
                  `🔴 **Live**: ${upTime.text}`,
               ].join('\n')
            )
            .setFooter({
               text: `Information required by: ${member?.user.username}`,
               iconURL: interaction.user.displayAvatarURL({
                  forceStatic: true,
               }),
            })
            .setURL(`https://twitch.tv/${channelName}`)
            .setThumbnail('https://pngimg.com/uploads/twitch/twitch_PNG27.png')
            .setImage(avatarimg.text)
            .setTimestamp();

         const button = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Link')
            .setURL(`https://twitch.tv/${channelName}`);

         const row = new ActionRowBuilder({
            components: [button],
         });

         interaction.reply({ embeds: [embed] });
         if (upTime.text === channelName + ' is offline') {
            upTime.text = 'if Offline';
         }
      } catch (error) {
         console.error(error);
         return interaction.reply({
            content: [
               `${emojis.error} I couldn't find a channel with the name \`${channelName}\` on Twitch.`,
               `Usage: \`/twitch <channel name>\``,
            ].join('\n'),
         });
      }
   }
);
