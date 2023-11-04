import { economyData } from '../../../functions/tools/funcion_economy';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/economy';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'storeinfo',
  description: 'The storeinfo command can be used to view the store information.',
  aliases: ['store-info'],
  category: 'economy',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const data = await model.findOne({ userID: message.author.id });
      await economyData(client, message, message.author);
      if (!data) return;

      var user = message.author;
      if (user.bot)
        return message.reply({
          content: [
            `${emojis.error} A bot cannot have its own economy within the Discord server, what a shame!`,
            `**Error Time:** ${Date.now() - message.createdTimestamp}ms`,
          ].join('\n'),
        });

      const itemsData = {
        yacht: 75000,
        lamborghini: 50000,
        car: 6400,
        motorbike: 1500,
        bicycle: 500,
        nike: 300,
        tshirt: 60,
        mansion: 45000,
        house: 8000,
        dirthut: 150,
        earth: 100000000,
        pensil: 20,
        pen: 10,
        condom: 30,
        bottle: 50,
        fish: 1000,
        hamster: 1500,
        dog: 2000,
        cat: 2000,
        lizard: 2000,
      };

      const storeItems = data.store?.items || {};

      let items = 0;
      let itemsvalue = 0;

      for (const itemarray in itemsData) {
        if (Object.prototype.hasOwnProperty.call(itemsData, itemarray)) {
          const userItemCount = storeItems[itemarray as keyof typeof itemsData] || 0;
          const prize = itemsData[itemarray as keyof typeof itemsData] || 0;
          items += userItemCount;
          itemsvalue += prize * userItemCount;
        }
      }

      const p2b = (costs: number) => (Number(costs) > Number(data.money) ? `${emojis.error}` : `${emojis.correct}`);

      const embedone = new EmbedBuilder()
        .setColor(client.color)
        .setFooter({
          text: user.tag + ' | ❌ .. Unable to buy | ✅ ... Possible to buy',
          iconURL: user.displayAvatarURL({ forceStatic: true }),
        })
        .setTitle(`${emojis.bear} Mika Shop`)
        .addFields(
          {
            name: '🧸 Bought Items',
            value: [
              `> **Bought Items:** \`${items}\` ${emojis.ice}`,
              `> **Total Value:** \`${nFormatter(itemsvalue)}\` 💸`,
            ].join('\n'),
            inline: true,
          },
          {
            name: '😺 How to Buy?',
            value: [`> To buy: \`${prefix}buy <ITEM> <QUANTITY>\``, `> Example: \`${prefix}buy fish 1\``].join('\n'),
            inline: true,
          },
          {
            name: '🏠 How Does the Shop Work?',
            value: [
              `> The shop works with money you earn by playing the bot's economy 💸`,
              `> To earn money, you can use the command \`${prefix}work\``,
              `> To see your money, use the command \`${prefix}balance\``,
            ].join('\n'),
          },
          {
            name: 'Usable Items',
            value: [
              `✏️ **Pencil \`[10 💸]\`** | ${p2b(10)}`,
              `🖊️ **Pen \`[20 💸]\`** | ${p2b(20)}`,
              `🟪 **Condom \`[30 💸]\`** | ${p2b(30)}`,
              `🍼 **Bottle \`[50 💸]\`** | ${p2b(50)}`,
            ].join('\n'),
            inline: true,
          },
          {
            name: 'Clothing',
            value: [
              `👟 **Nike Shoe \`[300 💸]\`** | ${p2b(300)}`,
              `👕 **T-Shirt \`[60 💸]\`** | ${p2b(60)}`,
              `👖 **Pants \`[100 💸]\`** | ${p2b(100)}`,
              `🧢 **Hat \`[50 💸]\`** | ${p2b(50)}`,
            ].join('\n'),
            inline: true,
          }
        );

      const embedtwo = new EmbedBuilder()
        .setColor(client.color)
        .setFooter({
          text: user.tag + ' | ❌ .. Unable to buy | ✅ ... Possible to buy',
          iconURL: user.displayAvatarURL({ forceStatic: true }),
        })
        .setTitle(`${emojis.bear} Mika Shop`)
        .addFields(
          {
            name: '🛥️ How to View My Profile and Inventory?',
            value: [
              `> To view your profile and purchased items in the bot, use:`,
              `> To view your profile, use the command \`${prefix}profile\``,
              `> To view your inventory, use the command \`${prefix}inventory\``,
            ].join('\n'),
          },
          {
            name: 'Animal Pets',
            value: [
              `🐟 **Fish \`[1000 💸]\`** | ${p2b(1000)}`,
              `🐹 **Hamster \`[1500 💸]\`** | ${p2b(1500)}`,
              `🐕 **Dog \`[2000 💸]\`** | ${p2b(2000)}`,
              `😺 **Cat \`[2000 💸]\`** | ${p2b(2000)}`,
              `🦎 **Lizard \`[2000 💸]\`** | ${p2b(2000)}`,
            ].join('\n'),
            inline: true,
          },
          {
            name: 'Means of Transport',
            value: [
              `🛥️ **Yacht \`[75000 💸]\`** | ${p2b(75000)}`,
              `🏎️ **Lamborghini \`[50000 💸]\`** | ${p2b(50000)}`,
              `🚗 **Car \`[6400 💸]\`** | ${p2b(6400)}`,
              `🏍️ **Motorbike \`[1500 💸]\`** | ${p2b(1500)}`,
              `🚲 **Bicycle \`[500 💸]\`** | ${p2b(500)}`,
            ].join('\n'),
            inline: true,
          }
        );

      const embedthree = new EmbedBuilder()
        .setColor(client.color)
        .setFooter({
          text: user.tag + ' | ❌ .. Unable to buy | ✅ ... Possible to buy',
          iconURL: user.displayAvatarURL({ forceStatic: true }),
        })
        .setTitle(`${emojis.bear} Mika Shop`)
        .addFields(
          {
            name: '🌍 Homes for Prosperity',
            value: [
              `> To have a home and prosper in the bot's economy, use:`,
              `> To buy a mansion, use the command \`${prefix}buy mansion\``,
            ].join('\n'),
          },
          {
            name: 'Homes and Rides',
            value: [`🏘️ **Mansion \`[45000 💸]\`** | ${p2b(45000)}`, `🏠 **House \`[8000 💸]\`** | ${p2b(8000)}`].join(
              '\n'
            ),
          },
          {
            name: 'Extras',
            value: [
              `🟫 **Dirthut \`[150 💸]\`** | ${p2b(150)}`,
              `🌍 **Earth \`[100000000 💸]\`** | ${p2b(100000000)}`,
            ].join('\n'),
          }
        );

      const botones = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setStyle(ButtonStyle.Primary).setEmoji('⬅️').setLabel('Back').setCustomId('back'),
        new ButtonBuilder().setStyle(ButtonStyle.Primary).setEmoji('➡️').setLabel('Next').setCustomId('next'),
        new ButtonBuilder().setStyle(ButtonStyle.Primary).setEmoji('❌').setLabel('Close').setCustomId('close')
      );

      message.reply({ embeds: [embedone], components: [botones as any] }).then(async (msg) => {
        const filter = (button: any) => button.user.id === user.id;
        const collector = msg.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (button) => {
          if (button.customId === 'back') {
            await msg.edit({ embeds: [embedthree], components: [botones as any] });
            await button.deferUpdate();
          } else if (button.customId === 'next') {
            await msg.edit({ embeds: [embedtwo], components: [botones as any] });
            await button.deferUpdate();
          } else if (button.customId === 'close') {
            await msg.edit({
              embeds: [
                embedone.setDescription(`${emojis.error} Come back soon, Bot Shop at Night Support Studio is closed`),
              ],
              components: [],
            });
          }
        });

        collector.on('end', async () => {
          await msg.edit({
            embeds: [
              embedone.setDescription(`${emojis.error} Come back soon, Bot Shop at Night Support Studio is closed`),
            ],
            components: [],
          });
        });
      });
    } catch (e) {
      logWithLabel('error', `the error is: ${e}`);
      return message.reply({
        content: [
          `${emojis.error} An error occurred while executing the command.`,
          `Please try again later or contact the server support if the error persists.`,
        ].join('\n'),
      });
    }
  },
};

function nFormatter(num: number, digits = 2) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}
