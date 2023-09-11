import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import model from '../../../models/products';

export default new Command(
   new SlashCommandBuilder()
      .setName('products')
      .setDescription('Show all products in the api database'),
   async (client, interaction) => {
      const products = await model.find({});
      const embed = new EmbedBuilder()
         .setTitle('Products')
         .setColor('Random')
         .setTimestamp()
         .setFooter({ text: 'Products list' })
         .setDescription(
            products
               .map((product) => {
                  return `\`${product.id}\`: ${product.name}`;
               })
               .join('\n')
         );

      await interaction.reply({ embeds: [embed] });
   }
);
