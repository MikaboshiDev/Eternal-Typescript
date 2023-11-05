import axios from 'axios';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'pokedex',
  description: 'Pokedex command can show you information about pokemon',
  aliases: ['poke-dex'],
  category: 'interactions',
  premium: true,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const pokemon = args.join(' ');
      if (!pokemon)
        return message.reply({
          content: [
            `${emojis.error} Please provide a pokemon name!`,
            `Correct usage: \`${prefix}pokedex <pokemon>\``,
          ].join('\n'),
        });

      const response = await getResponse(`https://pokeapi.glitch.me/v1/pokemon/${pokemon}`);
      if (response.status === 404) {
        message.channel.send({
          content: [
            `${emojis.error} The pokemon \`${pokemon}\` was not found in the PokéDex!`,
            `Please make sure you spelled the name correctly and try again!`,
          ].join('\n'),
        });
      } else {
        if (!response.success) return;
        const json = response.data[0];
        if (!json) return;
        const name = json.name.toLowerCase();
        let hiddenAbilities = ` and ${json.abilities.hidden}.`;
        if (!json.abilities.hidden.length) {
          hiddenAbilities = '.';
        }
        let gender = json.gender;
        if (!json.gender.length) {
          gender = 'Genderless';
        }

        const button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Bulbapedia')
            .setURL(`https://bulbapedia.bulbagarden.net/wiki/${json.name}`)
            .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
            .setLabel('Serebii')
            .setURL(`https://www.serebii.net/pokedex-swsh/${json.name.toLowerCase()}`)
            .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
            .setLabel('Smogon')
            .setURL(`https://www.smogon.com/dex/ss/pokemon/${json.name.toLowerCase()}`)
            .setStyle(ButtonStyle.Link)
        );

        await message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: `PokéDex: ${json.name}`,
                iconURL: `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`,
              })
              .setColor('Random')
              .setThumbnail(`https://play.pokemonshowdown.com/sprites/ani/${name}.gif`)
              .addFields(
                { name: 'National Dex Number', value: `${json.nationalNumber}`, inline: true },
                { name: 'Type(s)', value: `${json.types.join(', ')}`, inline: true },
                { name: 'Abilities', value: `${json.abilities.normal}${hiddenAbilities}`, inline: false },
                { name: 'Gender Ratio', value: `${gender}`, inline: false },
                { name: 'Height and Weight', value: `${json.height} foot tall\n${json.weight}`, inline: true },
                {
                  name: 'Evolutionary line',
                  value: `${json.family.evolutionLine.join(', ')}\nCurrent Evolution Stage: ${
                    json.family.evolutionStage
                  }`,
                  inline: true,
                },
                { name: 'Generation', value: `${json.gen}`, inline: false },
                { name: 'Egg Groups', value: `${json.eggGroups.join(', ')}`, inline: false },
                { name: 'Catch Rate', value: `${json.captureRate}`, inline: false }
              )
              .setFooter({ text: json.description }),
          ],
          components: [button as any],
        });
      }

      async function getResponse(url: string) {
        try {
          const res = await axios.get(url);
          return {
            success: true,
            status: res.status,
            data: res.data,
          };
        } catch (error: any) {
          return {
            success: false,
            status: error.response?.status,
            data: error.response?.data,
          };
        }
      }
    } catch (err) {
      logWithLabel('error', `The following error occured: ${err}`);
      message.channel.send({
        content: [
          `${emojis.error} The following error occured: \`${err}\``,
          `**Example:** \`${prefix}pokedex pikachu\``,
        ].join('\n'),
      });
    }
  },
};
