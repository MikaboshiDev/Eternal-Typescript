/*
# Discord Server: https://discord.gg/pgDje8S3Ed
# Github: https://github.com/MikaboshiDev
# Docs: https://docs.night-support.xyz/
# Dashboard: http://www.night-support.xyz/

# Created by: MikaboshiDev
# Version: 0.0.2
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/

import { EmbedBuilder, Client, ChatInputCommandInteraction, Message } from 'discord.js';
import User from '../src/models/ranking/schema';
import ChannelDB from '../src/models/ranking/channel';
const cooldown = new Set();
module.exports = (client: any) => {
  client.on('messageCreate', async (message: Message) => {
    const guildId = message.guild?.id;
    const userId = message.author.id;

    if (message.author.bot || !message.guild) return;
    if (cooldown.has(userId)) return;

    let user;

    try {
      const channelDB = await ChannelDB.findOne({ guild: guildId });

      if (!channelDB || !channelDB.status) {
        return;
      }

      const xpAmount = Math.floor(Math.random() * (25 - 15 + 1) + 15);

      user = await User.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: { xp: xpAmount },
        },
        { upsert: true, new: true }
      );

      let { xp, level } = user;

      if (xp >= level * 100) {
        ++level;
        xp = 0;

        let notificationChannel = null;

        if (channelDB) {
          try {
            notificationChannel = await client.channels.fetch(channelDB.channel);
          } catch (err) {
            console.log(err);
          }
        }

        if (!notificationChannel) {
          notificationChannel = message.channel;
        }

        const embed = new EmbedBuilder()
          .setTitle('🎉 Congratulations! 🎉')
          .setThumbnail(message.author.avatarURL({ forceStatic: true }))
          .addFields(
            {
              name: 'User:',
              value: `${message.author.username}`,
              inline: true,
            },
            { name: 'Level:', value: `${level}`, inline: true },
            {
              name: 'Check the global leaderboard using:',
              value: '`/ranking leaderboard`',
            }
          )
          .setColor('Aqua');

        notificationChannel.send({ embeds: [embed] });

        await User.updateOne(
          {
            guildId,
            userId,
          },
          {
            level,
            xp,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 60 * 1000);
  });
};
