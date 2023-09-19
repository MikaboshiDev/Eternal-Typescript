import {
   ActionRowBuilder,
   ButtonBuilder,
   ButtonStyle,
   EmbedBuilder,
   SlashCommandBuilder,
} from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import { Command } from '../../../class/builders';

export default new Command(
   new SlashCommandBuilder()
      .setName('invoice')
      .setDescription('The payment invoice for the bot.')
      .setDMPermission(false)
      .addUserOption((option) =>
         option
            .setName('user')
            .setDescription('The user you want to send the invoice to.')
            .setRequired(true)
      )
      .addNumberOption((option) =>
         option
            .setName('price')
            .setDescription('The price of the item you want to buy.')
            .setRequired(true)
      )
      .addStringOption((option) =>
         option
            .setName('service')
            .setDescription('The service you want to buy.')
            .setRequired(true)
      ),
   async (client, interaction) => {
      const author = interaction.user;
      const paypal = client.paypal;

      const embed = new EmbedBuilder()
         .setColor('Green')
         .setAuthor({
            name: 'PayPal Invoice',
            iconURL: author?.displayAvatarURL({ forceStatic: true }),
         })
         .setFooter({
            text: `ID: ${author?.id}`,
            iconURL: author?.displayAvatarURL({ forceStatic: true }),
         })
         .setTitle('Paypal - Invoice')
         .setTimestamp();

      const user = interaction.options.getUser('user');
      const price = interaction.options.getNumber('price');
      const service = interaction.options.getString('service');

      let invoiceObject = {
         merchant_info: {
            email: process.env.email_paypal,
            business_name: process.env.paypal_bussines,
         },
         items: [
            {
               name: service ? service : 'No service provided',
               quantity: 1.0,
               unit_price: {
                  currency: 'USD',
                  value: `${price}`,
               },
            },
         ],
         logo_url: interaction.guild?.iconURL({
            forceStatic: true,
         }) as string,
         note: 'Thank you for your purchase!',
         terms: 'No refunds',
         payment_term: {
            term_type: 'NET_45',
         },
         tax_inclusive: false,
      };

      paypal.invoice.create(invoiceObject, async (error, invoice) => {
         if (error) {
            logWithLabel('paypal', `Error creating invoice: ${error}`);
            console.log(error);
            return interaction.reply({
               content: 'There was an error creating the invoice.',
               ephemeral: true,
            });
         }

         const invoiceLink = invoice.links
            ? invoice.links[0].href
            : 'No link provided';

         const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
               .setURL(invoiceLink)
               .setStyle(ButtonStyle.Link)
               .setLabel('Pay Now')
         );

         interaction.reply({
            embeds: [
               embed.addFields(
                  {
                     name: 'Manager',
                     value: `${author?.tag}\n(\`${author?.id}\`)`,
                     inline: true,
                  },
                  {
                     name: 'User',
                     value: `${user?.tag}\n(\`${user?.id}\`)`,
                     inline: true,
                  },
                  {
                     name: 'Service',
                     value: service ? service : 'No service provided',
                     inline: false,
                  },
                  {
                     name: 'Price (USD)',
                     value: `$${price}`,
                     inline: true,
                  },
                  {
                     name: 'Comission',
                     value: `$${price ? price * 0.05 : 0}`,
                     inline: true,
                  },
                  {
                     name: 'Total',
                     value: `$${price ? price + price * 0.05 : 0}`,
                     inline: true,
                  }
               ),
            ],
            components: [button as any],
         });
      });
   }
);