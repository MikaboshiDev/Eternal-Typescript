import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import guildDatas from '../../../models/counter/guild';
import userDatas from '../../../models/counter/user';
import userGuildDatas from '../../../models/counter/userGuild';
import { Command } from '../../../structure/builders';
export default new Command(
  new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('👥 Leaderboard command for the counting channel (WIP)')
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('score')
        .setDescription('👥 View the top ten guild score.')
        .addNumberOption((num) => {
          return num
            .setName('page')
            .setRequired(false)
            .setDescription('👥 The page on the leaderboard you would like to view.');
        });
    })
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('server')
        .setDescription('👥 View the top ten user score in this guild.')
        .addNumberOption((num) => {
          return num
            .setName('page')
            .setRequired(false)
            .setDescription('👥 The page on the leaderboard you would like to view.');
        });
    })
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('total')
        .setDescription('👥 View the top ten total score.')
        .addNumberOption((num) => {
          return num
            .setName('page')
            .setRequired(false)
            .setDescription('👥 The page on the leaderboard you would like to view.');
        });
    })
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('user')
        .setDescription('👥 View the top ten user score.')
        .addNumberOption((num) => {
          return num
            .setName('page')
            .setRequired(false)
            .setDescription('👥 The page on the leaderboard you would like to view.');
        });
    }),
  async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    if (!interaction.guild) return;

    switch (subcommand) {
      case 'score':
        {
          const page = interaction.options.getNumber('page');

          const guildData = await guildDatas.find().sort({ score: -1 });
          const guildScore = await guildDatas.findOne({ id: interaction.guild.id });

          const embed = new EmbedBuilder().setTitle('🏆 Score Leaderboard').setColor('#2f3136').setTimestamp();

          if (guildScore && guildScore.channelId !== '0') {
            const rank = guildData.findIndex((b) => b.id === interaction.guild?.id);

            embed.setDescription(
              `> ${interaction.guild.name} on at **#${rank + 1}** in the leaderboard with **${
                guildScore.score
              }** score!`
            );
          }

          if (guildScore && guildScore.channelId == '0') {
            const rank = guildData.findIndex((b) => b.id === interaction.guild?.id);

            embed.setDescription(
              `> ${interaction.guild.name} on at **#${rank + 1}** in the leaderboard with **${
                guildScore.score
              }** score but counting channel is not setuped in this guild.`
            );
          }

          if (!guildScore) {
            embed.setDescription(
              `The counting channel is not setuped in this guild. Use **/setchannel** to get a position on leaderboard.`
            );
          }

          if (page) {
            const pageNum = 10 * page - 10;
            if (guildData.length < pageNum) {
              return await interaction.reply({ content: `❌ Unable to find page no **${page}**.` });
            }
            if (guildData.length >= 11) {
              embed.setFooter({
                text: `page ${page} of ${Math.ceil(guildData.length / 10)}`,
              });
            }

            for (const score of guildData.splice(pageNum, 10)) {
              const index = guildData.findIndex((b) => b.id == score.id);
              embed.addFields({
                name: `${
                  index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`
                } ${score.name}`,
                value: `> Score: ${score.score}`,
              });
            }

            return await interaction.reply({ embeds: [embed] });
          }

          if (guildData.length >= 11) {
            embed.setFooter({
              text: `page 1 of ${Math.ceil(guildData.length / 10)}`,
            });
          }

          for (const score of guildData.slice(0, 10)) {
            const index = guildData.findIndex((b) => b.id == score.id);
            embed.addFields({
              name: `${
                index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`
              } ${score.name}`,
              value: `> Score: ${score.score}`,
            });
          }
          return await interaction.reply({ embeds: [embed] });
        }
        break;
      case 'total':
        {
          const page = interaction.options.getNumber('page');

          const guildData = await guildDatas.find().sort({ totalScore: -1 });
          const guildScore = await guildDatas.findOne({ id: interaction.guild.id });

          const embed = new EmbedBuilder().setTitle('🏆 Total Score Leaderboard').setColor('#2f3136').setTimestamp();

          if (guildScore && guildScore.channelId !== '0') {
            const rank = guildData.findIndex((b) => b.id === interaction.guild?.id);

            embed.setDescription(
              `> ${interaction.guild.name} on at **#${rank + 1}** in the leaderboard with **${
                guildScore.totalScore
              }** score!`
            );
          }

          if (guildScore && guildScore.channelId == '0') {
            const rank = guildData.findIndex((b) => b.id === interaction.guild?.id);

            embed.setDescription(
              `> ${interaction.guild.name} on at **#${rank + 1}** in the leaderboard with **${
                guildScore.totalScore
              }** score but counting channel is not setuped in this guild.`
            );
          }

          if (!guildScore) {
            embed.setDescription(
              `The counting channel is not setuped in this guild. Use **/setchannel** to get a position on leaderboard.`
            );
          }

          if (page) {
            const pageNum = 10 * page - 10;
            if (guildData.length < pageNum) {
              return await interaction.reply({ content: `❌ Unable to find page no **${page}**.` });
            }
            if (guildData.length >= 11) {
              embed.setFooter({
                text: `page ${page} of ${Math.ceil(guildData.length / 10)}`,
              });
            }

            for (const guild of guildData.splice(pageNum, 10)) {
              const index = guildData.findIndex((b) => b.id == guild.id);
              embed.addFields({
                name: `${
                  index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`
                } ${guild.name}`,
                value: `> Score: ${guild.totalScore}`,
              });
            }

            return await interaction.reply({ embeds: [embed] });
          }

          if (guildData.length >= 11) {
            embed.setFooter({
              text: `page 1 of ${Math.ceil(guildData.length / 10)}`,
            });
          }

          for (const guild of guildData.slice(0, 10)) {
            const index = guildData.findIndex((b) => b.id == guild.id);
            embed.addFields({
              name: `${
                index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`
              } ${guild.name}`,
              value: `> Score: ${guild.totalScore}`,
            });
          }
          return await interaction.reply({ embeds: [embed] });
        }
        break;
      case 'user':
        {
          const page = interaction.options.getNumber('page');

          const userData = await userDatas.find().sort({ score: -1 });
          const userScore = await userDatas.findOne({ id: interaction.user.id });

          const embed = new EmbedBuilder().setTitle('🏆 User Leaderboard').setColor('#2f3136').setTimestamp();

          if (userScore) {
            const rank = userData.findIndex((b) => b.id === interaction.user.id);

            embed.setDescription(`> ***#${rank + 1}*** **${interaction.user.username}**`);
          }

          if (page) {
            const pageNum = 10 * page - 10;
            if (userData.length < pageNum) {
              return await interaction.reply({ content: `❌ Unable to find page no **${page}**.` });
            }
            if (userData.length >= 11) {
              embed.setFooter({
                text: `page ${page} of ${Math.ceil(userData.length / 10)}`,
              });
            }

            for (const user of userData.splice(pageNum, 10)) {
              const index = userData.findIndex((b) => b.id == user.id);
              embed.addFields({
                name: `${
                  index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`
                } ${user.name}`,
                value: `> Score: ${user.score}`,
              });
            }

            return await interaction.reply({ embeds: [embed] });
          }

          if (userData.length >= 11) {
            embed.setFooter({
              text: `page 1 of ${Math.ceil(userData.length / 10)}`,
            });
          }

          for (const user of userData.slice(0, 10)) {
            const index = userData.findIndex((b) => b.id == user.id);
            embed.addFields({
              name: `${
                index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`
              } ${user.name}`,
              value: `> Score: ${user.score}`,
            });
          }
          return await interaction.reply({ embeds: [embed] });
        }
        break;
      case 'server':
        {
          const page = interaction.options.getNumber('page');

          const guildData = await guildDatas.findOne({ id: interaction.guild.id });

          if (!guildData) {
            return await interaction.reply('❌ The counting channel is not setuped in this guild.');
          }

          const userGuildData = await userGuildDatas.find({ server: interaction.guild.id }).sort({ score: -1 });
          const userGuildScore = await guildDatas.findOne({
            id: interaction.user.id,
            server: interaction.guild.id,
          });

          if (!userGuildData) {
            return await interaction.reply(`No user available in this server..`);
          }

          const embed = new EmbedBuilder().setTitle('🏆 Server Leaderboard').setColor('#2f3136').setTimestamp();

          if (userGuildScore) {
            const rank = userGuildData.findIndex((b) => b.id === interaction.user.id);

            embed.setDescription(`> ***#${rank + 1}*** **${interaction.user.username}**`);
          }

          if (page) {
            const pageNum = 10 * page - 10;
            if (userGuildData.length < pageNum) {
              return await interaction.reply({ content: `❌ Unable to find page no **${page}**.` });
            }
            if (userGuildData.length >= 11) {
              embed.setFooter({
                text: `page ${page} of ${Math.ceil(userGuildData.length / 10)}`,
              });
            }

            for (const user of userGuildData.splice(pageNum, 10)) {
              const index = userGuildData.findIndex((b) => b.id == user.id);
              embed.addFields({
                name: `${
                  index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`
                } ${user.name}`,
                value: `> Score: ${user.score}`,
              });
            }

            return await interaction.reply({ embeds: [embed] });
          }

          if (userGuildData.length >= 11) {
            embed.setFooter({
              text: `page 1 of ${Math.ceil(userGuildData.length / 10)}`,
            });
          }

          for (const user of userGuildData.slice(0, 10)) {
            const index = userGuildData.findIndex((b) => b.id == user.id);
            embed.addFields({
              name: `${
                index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`
              } ${user.name}`,
              value: `> Score: ${user.score}`,
            });
          }
          return await interaction.reply({ embeds: [embed] });
        }
        break;
    }
  }
);
