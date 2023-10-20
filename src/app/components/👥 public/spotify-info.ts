import { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } from '@discordjs/voice';
import { ChannelType, Embed, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import axios from 'axios';

module.exports = {
  name: 'spotify-info',
  description: 'get search songs on spotify',
  aliases: ['spotify-info', 'spotify'],
  category: 'public',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const url = args.join(' ');
    if (!url)
      return message.channel.send({
        content: [
          `${emojis.error} **${message.author.username}**, You need to provide a spotify song url!`,
          `**Usage:** \`${prefix}spotify-info [url]\``,
        ].join('\n'),
      });

    const voiceChannel = message.member?.voice.channel;

    const connection = joinVoiceChannel({
      channelId: voiceChannel?.id as string,
      guildId: message.guild?.id as string,
      adapterCreator: message.guild?.voiceAdapterCreator as any,
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    try {
      const data = await axios.get(`https://luminabot.xyz/api/json/spotify?link=${url}`);
      const info = data.data;
      if (voiceChannel) {
        const resource = createAudioResource(info.audio);
        player.play(resource);

        connection.subscribe(player);
        const embed = new EmbedBuilder()
          .setTitle(info.title)
          .setURL(info.link)
          .setColor('Red')
          .setFields(
            { name: 'Artist', value: info.artist, inline: true },
            { name: 'Release Date', value: info.release, inline: true },
            {
              name: 'Description',
              value: info.description ? info.description : `${emojis.error} No description available`,
              inline: true,
            }
          )
          .setImage(info.image);

        setTimeout(function () {
          try {
            connection.destroy();
          } catch (err) {
            message.channel.send({
              content: [
                `${emojis.error} **${message.author.username}**, I can't leave the voice channel!`,
                `**Usage:** \`${prefix}spotify-info [url]\``,
              ].join('\n'),
            });
          }
        }, 40000);
        return message.channel.send({ embeds: [embed] });
      } else {
        if (!voiceChannel)
          message.channel.send({
            content: [
              `${emojis.error} **${message.author.username}**, You need to be in a voice channel to use this command!`,
              `**Usage:** \`${prefix}spotify-info [url]\``,
            ].join('\n'),
          });
        const embed = new EmbedBuilder()
          .setTitle(info.title)
          .setURL(info.link)
          .setColor('Red')
          .setFields(
            { name: 'Artist', value: info.artist, inline: true },
            { name: 'Release Date', value: info.release, inline: true },
            {
              name: 'Description',
              value: info.description ? info.description : `${emojis.error} No description available`,
              inline: true,
            }
          )
          .setImage(info.image);

        return message.channel.send({ embeds: [embed] });
      }
    } catch (e) {
      console.log(e);
      message.channel.send({
        content: [
          `${emojis.error} **${message.author.username}**, I can't find the song!`,
          `**Usage:** \`${prefix}spotify-info [url]\``,
        ].join('\n'),
      });
    }
  },
};
