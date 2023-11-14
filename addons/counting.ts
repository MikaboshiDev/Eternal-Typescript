import { Client, EmbedBuilder, EmojiIdentifierResolvable, Message, PermissionFlagsBits } from 'discord.js';
import userGuildDatas from '../src/models/counter/userGuild';
import guildDatas from '../src/models/counter/guild';
import userDatas from '../src/models/counter/user';
import botDatas from '../src/models/counter/bot';
import { filterContent } from './counter/filter';
import emojis from '../config/emojis.json';

module.exports = (client: Client) => {
  client.on('messageCreate', async (message: Message) => {
    if (message.guild === null) return;

    const guildData = await guildDatas.findOne({ id: message.guild.id });
    if (!guildData) return;

    if (message.channel.id !== guildData.channelId) return;
    if (message.author.bot) return;

    const userData = await userDatas.findOne({ id: message.author.id });
    if (!userData) {
      userDatas.create({
        id: message.author.id,
        name: message.author.username,
      });
    }

    const userGuildData = await userGuildDatas.findOne({
      id: message.author.id,
      server: message.guild.id,
    });

    if (!userGuildData) {
      userGuildDatas.create({
        id: message.author.id,
        server: message.guild.id,
        name: message.author.username,
      });
    }

    if (
      guildData.countRole?.on == true &&
      !message.member?.roles.cache.has(guildData.countRole.id) &&
      message.guild.members.me?.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      message.delete();
    }

    if (
      guildData.countRole?.on == true &&
      !message.member?.roles.cache.has(guildData.countRole.id) &&
      !message.guild.members.me?.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      message.react(guildData.reaction?.warn as EmojiIdentifierResolvable);
    }

    const botData = await botDatas.findOne({ id: client.user?.id });
    const math = filterContent(message, guildData, userData as any);

    if (math == 'one') {
      if (guildData.numOnly == true) {
        if (message.guild.members.me?.permissions.has(PermissionFlagsBits.ManageMessages)) {
          message.delete();
        } else {
          message.channel.send({
            content: [
              `${emojis.error} Number Only setting has beed disabled because **I dont have ManageMessages permission in this channel**.`,
              `Please give me ManageMessages permission in this channel to enable Number Only setting.`,
            ].join('\n'),
          });
          guildData.numOnly = false;
        }
      } else {
      }
    } else if (math == 'two') {
      message.react(guildData.reaction?.saves as EmojiIdentifierResolvable);

      message.channel.send({
        content: `<@${message.author.id}> ⛑️ You have used **1** of your saves. You have ${
          userData?.saves ? userData?.saves - 1 : 0
        } left. The next number is **${guildData.score + 1}!**.`,
      });

      userData?.saves ? (userData.saves -= 1) : 0;
      userData?.count?.rong ? (userData.count.rong += 1) : 0;
      userGuildData?.saveUsed ? (userGuildData.saveUsed += 1) : 0;
      userGuildData?.count?.rong ? (userGuildData.count.rong += 1) : 0;
      guildData.count?.rong ? (guildData.count.rong += 1) : 0;
    } else if (math == 'three') {
      message.react(guildData.reaction?.saves as EmojiIdentifierResolvable);

      message.channel.send({
        content: `<@${message.author.id}> ⛑️ You have used **1** of guild saves. Guild have ${
          guildData.saves
        } left. The next number is **${guildData.score + 1}!**.`,
      });

      userGuildData?.count?.rong ? (userGuildData.count.rong += 1) : 0;
      userGuildData?.saveUsed ? (userGuildData.saveUsed += 1) : 0;

      guildData.saves -= 1;
      guildData.count?.rong ? (guildData.count.rong += 1) : 0;
      if (userData && userData.count && userData.count.rong) {
        userData.count.rong += 1;
      }
    } else if (math == 'four') {
      message.react(guildData.reaction?.rong as EmojiIdentifierResolvable);

      message.channel.send({
        content: `<@${message.author.id}> RUINED IT AT **${guildData.score}**!! Next number is **1**. **You can't count two numbers in a raw.**`,
      });

      userGuildData?.count?.rong ? (userGuildData.count.rong += 1) : 0;
      if (userData && userData.count && userData.count.rong) {
        userData.count.rong += 1;
      }
      botData?.count?.rong ? (botData.count.rong += 1) : 0;
      guildData?.count?.rong ? (guildData.count.rong += 1) : 0;
      guildData.score = 0;
      guildData.lastUser = `None`;
    } else if (math == 'five') {
      message.react(guildData.reaction?.warn as EmojiIdentifierResolvable);
      const msg = await message.channel.send({
        content: [
          `${emojis.error} You can't count two numbers in a raw.`,
          `You can use saves to continue counting. See /rules.`,
        ].join("\n")
      });

      setTimeout(() => {
        msg.delete();
      }, 7000);
    } else if (math == 'six') {
      message.react(guildData.reaction?.rong as EmojiIdentifierResolvable);

      message.channel.send({
        content: `<@${message.author.id}> RUINED IT AT **${guildData.score}**!! Next number is **1**. **Rong Number.**`,
      });

      userGuildData?.count?.rong ? (userGuildData.count.rong += 1) : 0;
      botData?.count?.rong ? (botData.count.rong += 1) : 0;

      if (userData && userData.count && userData.count.rong) {
        userData.count.rong += 1;
      }

      guildData?.count?.rong ? (guildData.count.rong += 1) : 0;
      guildData.lastUser = `None`;
      guildData.score = 0;
    } else if (math == 'seven') {
      message.react(guildData.reaction?.right as EmojiIdentifierResolvable);

      userGuildData?.name ? (userGuildData.name = message.author.username) : "Can't set name";
      userGuildData?.count?.right ? (userGuildData.count.right += 1) : 0;
      userGuildData?.score ? (userGuildData.score += 1) : 0;

      guildData.score += 1;
      guildData.lastUser = message.author.id;
      guildData.name = message.guild.name;
      guildData.totalScore += 1;
      guildData?.count?.right ? (guildData.count.right += 1) : 0;

      userData?.count?.right ? (userData.count.right += 1) : 0;
      userData?.score ? (userData.score += 1) : 0;
      userData?.name ? (userData.name = message.author.username) : "Can't set name";
      botData?.count?.right ? (botData.count.right += 1) : 0;
    }

    if (guildData.highScore < guildData.score) {
      guildData.highScore = guildData.score;
    }

    guildData.save();
    userData?.save();
    botData?.save();
    userGuildData?.save();
  });
};
