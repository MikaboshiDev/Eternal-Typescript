import akaneko from 'akaneko';
import { EmbedBuilder, Message } from 'discord.js';
import superagent from 'superagent';
import { animeApi } from '../../../functions/tools/httpRequest';

module.exports = {
  name: 'nsfw',
  description: 'use nsfw commands within age restricted channels',
  aliases: ['nsfw'],
  category: 'nsfw',
  examples: [`nsfw [subcommand] [properties]`, `nsfw [command]`],
  premium: false,
  nsfw: true,
  subcommands: [`all subcommands function nsfw discord servers`],
  async execute(client: any, message: Message, args: string[], prefix: any) {
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
      case 'doujin':
        {
          const image = await akaneko.nsfw.doujin();
          const a = new EmbedBuilder().setImage(image as any);
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
      case 'maids':
        {
          const image = await akaneko.nsfw.maid();
          const a = new EmbedBuilder().setImage(image as any);
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
      case 'netorare':
        {
          const image = await akaneko.nsfw.netorare();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'ass':
        {
          const image = await akaneko.nsfw.ass();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'bdsm':
        {
          const image = await akaneko.nsfw.bdsm();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'blowjob':
        {
          const image = await akaneko.nsfw.blowjob();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'cum':
        {
          const image = await akaneko.nsfw.cum();
          const a = new EmbedBuilder().setImage(image as any);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
      case 'trap':
        {
          const data = await animeApi('trap');
          const a = new EmbedBuilder().setImage(data);
          message.reply({ embeds: [a] }).catch(() => {});
        }
        break;
    }
  },
};
