import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  ComponentType,
  EmbedBuilder,
  Message,
} from 'discord.js';
import emojis from '../../../../config/emojis.json';
import fetch from 'node-fetch';

module.exports = {
  name: 'meme',
  description: 'Meme command can show you meme',
  aliases: ['memes'],
  category: 'public',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
/*    let meme = await fetch('https://meme-api.herokuapp.com/gimme').then((r) => r.json());
    const button = new ActionRowBuilder().addComponents([
      new ButtonBuilder().setLabel('Refresh').setStyle(ButtonStyle.Primary).setCustomId('refresh-button'),
    ]);

    const button_disable = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setLabel('Refresh')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('refresh-button')
        .setDisabled(true),
    ]);

    let interaction_message = await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(meme.title)
          .setURL(meme.postLink)
          .setImage(meme.url)
          .setColor('Blurple')
          .setFooter({ text: `${meme.ups}👍 || r/${meme.subreddit}` }),
      ],
      components: [button as any],
    });

    const filter = (i: any) => i.customId === 'refresh-button' && i.user.id === message.author.id;
    const collector = interaction_message.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (i: any) => {
      meme = await fetch('https://meme-api.herokuapp.com/gimme').then((r) => r.json());
      i.update({
        embeds: [
          new EmbedBuilder()
            .setTitle(meme.title)
            .setURL(meme.postLink)
            .setImage(meme.url)
            .setColor('Blurple')
            .setFooter({ text: `${meme.ups}👍 || r/${meme.subreddit}` }),
        ],
        components: [button as any],
      });
    });

    collector.on('end', () => {
      interaction_message.edit({
        components: [button_disable as any],
      });
    });*/
  },
};
