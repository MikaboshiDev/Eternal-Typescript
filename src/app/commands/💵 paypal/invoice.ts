import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { Command } from '../../../structure/builders';
import { logWithLabel } from '../../../utils/console';

export default new Command(
  new SlashCommandBuilder()
    .setName('payment')
    .setDescription('Create a sale for your profile')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('list')
        .setDescription('List all payments')
        .addNumberOption((option) =>
          option.setName('items_number').setDescription('Number of items to display').setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('create')
        .setDescription('Create a sale for your profile')
        .addStringOption((option) =>
          option.setName('name_item').setDescription('Name of the item you want to sell').setRequired(true)
        )
        .addNumberOption((option) =>
          option.setName('price_item').setDescription('Price of the item you want to sell').setRequired(true)
        )
        .addNumberOption((option) =>
          option.setName('stock_item').setDescription('Stock of the item you want to sell').setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('description_item')
            .setDescription('Description of the item you want to sell')
            .setRequired(true)
        )
    ),
  async (client, interaction) => {
    await interaction.deferReply();
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'create':
        {
          const name = interaction.options.getString('name_item');
          const price = interaction.options.getNumber('price_item');
          const stock = interaction.options.getNumber('stock_item');
          const description = interaction.options.getString('description_item');

          if (!name || !price || !stock || !description)
            return interaction.reply({
              embeds: [
                client.embed({
                  title: 'Error - Missing Arguments',
                  description: [
                    `${emojis.error} Not name or price or stock or description`,
                    `**Usage:** \`/sale name price stock description\``,
                  ].join('\n'),
                  status: false,
                }),
              ],
            });

          const { user, member } = interaction;
          client.paypal.payment.create(
            {
              intent: 'sale',
              payer: {
                payment_method: 'paypal',
              },
              redirect_urls: {
                return_url: 'https://www.paypal.com/signin',
                cancel_url: 'https://discord.gg/RmprESN5bp',
              },
              transactions: [
                {
                  item_list: {
                    items: [
                      {
                        name: name,
                        sku: 'item',
                        price: price.toString(),
                        currency: 'USD',
                        quantity: stock,
                      },
                    ],
                  },
                  amount: {
                    currency: 'USD',
                    total: (price * stock).toString(),
                  },
                  description: description,
                },
              ],
            },
            (err, payment) => {
              if (err) {
                logWithLabel('error', `Error creating payment: ${err}`);
                console.log(err);
              }

              if (payment) {
                const embed = new EmbedBuilder()
                  .setTitle('Payment Manager - Create')
                  .setTimestamp(new Date().getTime())
                  .setColor('Orange')
                  .setFooter({
                    text: `Manager: ${user.tag}`,
                    iconURL: user.displayAvatarURL({ forceStatic: true }),
                  })
                  .setThumbnail(interaction.guild?.iconURL({ forceStatic: true }) as string)
                  .addFields(
                    {
                      name: 'Management',
                      value: [`Moderator: ${user}`, `> ID: \`${user.id}\``].join('\n'),
                      inline: true,
                    },
                    {
                      name: 'Guild',
                      value: [`> Name: \`${interaction.guild?.name}\``, `> ID: \`${interaction.guild?.id}\``].join(
                        '\n'
                      ),
                      inline: true,
                    },
                    {
                      name: 'Payment',
                      value: [
                        `> ID: \`${payment.id}\``,
                        `> Status: \`${payment.state}\``,
                        `> Type: \`${payment.payer.payment_method}\``,
                        `> Total: \`${payment.transactions[0].amount.total}\``,
                        `> Currency: \`${payment.transactions[0].amount.currency}\``,
                        `> Description: \`${payment.transactions[0].description}\``,
                      ].join('\n'),
                      inline: false,
                    },
                    {
                      name: 'Item',
                      value: [
                        `> Name: \`${payment.transactions[0].item_list?.items[0].name}\``,
                        `> Price: \`${payment.transactions[0].item_list?.items[0].price}\``,
                        `> Quantity: \`${payment.transactions[0].item_list?.items[0].quantity}\``,
                      ].join('\n'),
                      inline: false,
                    }
                  );

                const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                  new ButtonBuilder()
                    .setURL(payment.links ? payment.links[1].href : '')
                    .setLabel('Paypal')
                    .setStyle(ButtonStyle.Link),
                  new ButtonBuilder()
                    .setURL('http://www.night-support.xyz/')
                    .setLabel('Terms of Service')
                    .setStyle(ButtonStyle.Link)
                );

                interaction.editReply({
                  embeds: [embed],
                  components: [row],
                });
              }
            }
          );
        }
        break;
      case 'list':
        {
          const number = interaction.options.getNumber('items_number');
          if (!number)
            return interaction.reply({
              embeds: [
                client.embed({
                  title: 'Error - Missing Arguments',
                  description: [
                    `${emojis.error} Not number of items to display is not a number`,
                    `**Usage:** \`/sale list number\``,
                  ].join('\n'),
                  status: false,
                }),
              ],
            });

          client.paypal.payment.list({ count: number }, (err, payments) => {
            if (err) {
              logWithLabel('error', `Error listing payments: ${err}`);
              console.log(err);
              interaction.editReply({
                embeds: [
                  client.embed({
                    title: 'Error - Paypal',
                    description: [
                      `${emojis.error} Error listing payments ${interaction.user}`,
                      `**Error:** \`${err}\``,
                    ].join('\n'),
                    status: false,
                  }),
                ],
              });
            }

            if (payments) {
              const embed = new EmbedBuilder()
                .setTitle('Payment Manager - List')
                .setTimestamp(new Date().getTime())
                .setColor('Orange')
                .setFooter({
                  text: `Manager: ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL({ forceStatic: true }),
                })
                .setThumbnail(interaction.guild?.iconURL({ forceStatic: true }) as string)
                .addFields(
                  {
                    name: 'Management',
                    value: [`Moderator: ${interaction.user}`, `> ID: \`${interaction.user.id}\``].join('\n'),
                    inline: true,
                  },
                  {
                    name: 'Guild',
                    value: [`> Name: \`${interaction.guild?.name}\``, `> ID: \`${interaction.guild?.id}\``].join('\n'),
                    inline: true,
                  },
                  {
                    name: 'Payments',
                    value: [`> Count: \`${payments.count}\``, `> Next Page: \`${payments.next_id}\``].join('\n'),
                    inline: false,
                  }
                );

              const row = new ActionRowBuilder<ButtonBuilder>().addComponents(...generateButtons(payments.payments));

              interaction.editReply({
                embeds: [embed],
                components: [row],
              });
            }
          });
        }
        break;
    }
    function generateButtons(payments: any[]) {
      return payments.map((payment, index) => {
        return new ButtonBuilder()
          .setCustomId(`payment_${index}`)
          .setLabel(payment.state)
          .setStyle(ButtonStyle.Success);
      });
    }
  }
);
