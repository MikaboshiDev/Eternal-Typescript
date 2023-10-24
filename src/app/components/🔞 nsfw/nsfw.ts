import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import superagent from 'superagent';
import akaneko from 'akaneko';
import client from 'aflb';

module.exports = {
  name: 'nsfw',
  description: 'use nsfw commands within age restricted channels',
  aliases: ['nsfw'],
  category: 'nsfw',
  examples: [
    `nsfw [subcommand] [properties]`,
    `nsfw [command]`,
  ],
  premium: false,
  nsfw: true,
  cooldown: 5000,
  subcommands: [
    `all subcommands function nsfw discord servers`,
  ],
  async execute(message: Message, args: string[], prefix: any) {
    const { nsfw } = new client();
    const subcommands = args[0];
    switch (subcommands) {
      case '4k':
        {
          superagent
            .get('https://nekobot.xyz/api/image')
            .query({ type: '4k' })
            .end((err, response) => {
              message.channel.send({ files: [response.body.message] }).catch((e) => {});
            });
        }
        break;
      case 'ass':
        {
          const result = await nsfw.ass();
          const imageUrl = result.url;
          const a = new EmbedBuilder().setImage(imageUrl);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'bdsm':
        {
          const result = await nsfw.bdsm();
          const imageUrl = result.url;
          const a = new EmbedBuilder().setImage(imageUrl);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'blowjob':
        {
          const { url } = await nsfw.blowjob();
          const a = new EmbedBuilder().setImage(url);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'boobjob':
        {
          const result = await nsfw.boobjob();
          const a = new EmbedBuilder().setImage(result.url);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'cum':
        {
          const result = await nsfw.cum();
          const a = new EmbedBuilder().setImage(result.url);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'doujin':
        {
          const image = await akaneko.nsfw.doujin();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'elves':
        {
          const result = await nsfw.elves();
          const a = new EmbedBuilder().setImage(result.url);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'foxgirl':
        {
          const image = await akaneko.nsfw.foxgirl();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'gifs':
        {
          const image = await akaneko.nsfw.gifs();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'glasses':
        {
          const image = await akaneko.nsfw.glasses();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'hentai_gif':
        {
          const image = nsfw.hentai_gif();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'maids':
        {
          const image = await akaneko.nsfw.maid();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'masturbation':
        {
          const image = await nsfw.masturbation();
          const a = new EmbedBuilder()
            .setAuthor({ name: `${message.author} he is masturbating`, iconURL: message.author.displayAvatarURL() })
            .setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'mobile-wallpapers':
        {
          const image = await akaneko.nsfw.mobileWallpapers();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'nekonsfw':
        {
          const image = nsfw.neko_nsfw();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'panties':
        {
          const image = nsfw.panties();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'school':
        {
          const image = await akaneko.nsfw.school();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'succubos':
        {
          const image = await akaneko.nsfw.succubus();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'uglybastard':
        {
          const image = await akaneko.nsfw.uglyBastard();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'uniform':
        {
          const image = await akaneko.nsfw.uniform();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'wallpaper':
        {
          const image = await akaneko.wallpapers();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'wallpaper-movile':
        {
          const image = await akaneko.nsfw.wallpapers();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'zettai-ryouiki':
        {
          const image = await akaneko.nsfw.zettaiRyouiki();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
    }
  },
};
