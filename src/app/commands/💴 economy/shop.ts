import { EmbedBuilder, PermissionFlagsBits, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { fetchBalance, generateToken } from '../../../functions/modules/economy_modules';
import inventory from '../../../models/economy/inventory';
import { Command } from '../../../class/builders';
import shop from '../../../models/economy/shop';
import user from '../../../models/economy/user';
import { Types } from 'mongoose';
export default new Command(
  new SlashCommandBuilder()
    .setName('shop')
    .setDescription('View the guild shop or change its settings!')
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('add')
        .setDescription('add an item to the shop')
        .addStringOption((str) => {
          return str.setName('name').setDescription('the name of the product. (not the identifier)').setRequired(true);
        })
        .addStringOption((str) => {
          return str.setName('description').setDescription('the description of the item').setRequired(true);
        })
        .addNumberOption((num) => {
          return num.setName('price').setDescription('the price of the item').setRequired(true).setMinValue(1).setMaxValue(1000000);
        })
        .addRoleOption((option) => option.setName('role').setDescription('Give the user this role when he uses this item!'))
        .addNumberOption((option) => option.setName('money').setDescription('Give the user money when he uses this item!'))
        .addStringOption((str) => {
          return str
            .setName('identifier')
            .setDescription('the identifier of the product. (if not supplied a token will be generated)')
            .setRequired(false);
        });
    })
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('view')
        .setDescription('lets you view the shop!')
        .addNumberOption((num) => {
          return num.setName('page').setDescription('The page of the shop you want to view');
        });
    })
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('buy')
        .setDescription('Buy an item from the shop')
        .addStringOption((option) => {
          return option.setName('identifier').setDescription('The identifier of the item you want to buy');
        });
    })
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('remove')
        .setDescription('remove an item from the shop!')
        .addStringOption((option) => {
          return option.setName('identifier').setDescription('The identifier of the item you want to remove');
        });
    }),
  async (client, interaction) => {
    const { options } = interaction;

    switch (options.getSubcommand()) {
      case 'add':
        const itemName = options.getString('name');
        const itemDescription = options.getString('description');
        const itemPrice = options.getNumber('price');
        const itemIdentifier = options.getString('identifier') || generateToken(5);
        const money = options.getNumber('money') || null;
        let role = null;
        if (interaction.options.getRole('role')) role = options.getRole('role')?.id;

        if (!(interaction.member && (interaction.member.permissions as Readonly<PermissionsBitField>).has(PermissionFlagsBits.ManageGuild))) {
          return await interaction.reply({
            content: 'You do not have enough permissions to use this command!',
          });
        }

        new shop({
          _id: new Types.ObjectId(),
          guildId: interaction.guildId!,
          itemName: itemName,
          itemDescription: itemDescription,
          itemPrice: itemPrice,
          itemIdentifier: itemIdentifier,
          role: role || null,
          money: money,
        }).save();

        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle('New Item Added!')
              .setDescription('Item added to shop, to view the updated shop please do `/shop view`!')
              .addFields(
                {
                  name: 'Item Name',
                  value: `${itemName}`,
                },
                {
                  name: 'Item Description',
                  value: `${itemDescription}`,
                },
                {
                  name: 'Item Price',
                  value: `$${itemPrice}`,
                },
                {
                  name: 'Item Identifier',
                  value: `\`${itemIdentifier}\``,
                },
                {
                  name: 'Money given when claimed',
                  value: `\`${money}\``,
                },
                {
                  name: 'Role given when claimed',
                  value: `\`${role}\``,
                }
              ),
          ],
        });
        break;
      case 'view':
        const page = options.getNumber('page');
        const shopData = await shop.find({
          guildId: interaction.guildId!,
        });
        if (!shopData)
          return await interaction.reply({
            embeds: [new EmbedBuilder().setDescription('There are no items in this shop!').setColor('Red')],
          });

        const embed = new EmbedBuilder().setTitle(`Server Shop`).setDescription('to buy an item please use `/shop buy`!').setColor('Random');

        if (page) {
          const pageNum = 5 * page - 5;

          if (shopData.length >= 6) {
            embed.setFooter({
              text: `page ${page} of ${Math.ceil(shopData.length / 5)}`,
            });
          }

          for (const item of shopData.splice(pageNum, 5)) {
            embed.addFields({
              name: `${item.itemName}  <->  $${item.itemPrice}`,
              value: `> Identifier: \`${item.itemIdentifier}\`\n> Description: ${item.itemDescription}\n> Given Role: ${item.role}\n> Given Money: ${item.money}\n`,
            });
          }

          return await interaction.reply({ embeds: [embed] });
        }

        if (shopData.length >= 6) {
          embed.setFooter({
            text: `page 1 of ${Math.ceil(shopData.length / 5)}`,
          });
        }

        for (const item of shopData.slice(0, 5)) {
          embed.addFields({
            name: `${item.itemName}  <->  $${item.itemPrice}`,
            value: `> Identifier: \`${item.itemIdentifier}\`\n> Description: ${item.itemDescription}\n> Given Role: ${item.role}\n> Given Money: ${item.money}\n`,
          });
        }

        await interaction.reply({ embeds: [embed] });
        break;

      case 'buy':
        const identifier = interaction.options.getString('identifier');
        const itemShopData = await shop.findOne({
          guildId: interaction.guildId!,
        });
        const userBalance = await fetchBalance(interaction.user.id, interaction.guildId!);
        const InvData = await inventory.findOne({
          guildId: interaction.guildId!,
          userId: interaction.user.id,
          itemIdentifier: identifier,
        });

        if (InvData)
          return await interaction.reply({
            embeds: [new EmbedBuilder().setDescription('You have already bought this item!').setColor('Red')],
          });

        if (itemShopData?.itemIdentifier !== identifier)
          return await interaction.reply({
            embeds: [new EmbedBuilder().setDescription('No item exists with that identifier!').setColor('Red')],
          });

        const item = await shop.findOne({
          guildId: interaction.guildId,
          itemIdentifier: identifier,
        });

        if (!item?.itemPrice) {
          if (!item?.role) {
            return await interaction.reply({
              embeds: [new EmbedBuilder().setDescription('This item has no price or role!')],
            });
          }

          return await interaction.reply({
            embeds: [
              new EmbedBuilder().setDescription(
                `You have bought ${item?.itemName} for $${item?.itemPrice}! This item has been moved into your inventory.`
              ),
            ],
          });
        }

        if (Number(userBalance.balance) < Number(item.itemPrice))
          return await interaction.reply({
            embeds: [new EmbedBuilder().setDescription("You don't have enough money to buy this item")],
          });

        await user.findOneAndUpdate(
          { _id: userBalance._id },
          {
            balance: {
              $subtract: [{ $toDecimal: '$balance' }, { $toDecimal: item.itemPrice }],
            },
          }
        );

        new inventory({
          _id: new Types.ObjectId(),
          guildId: interaction.guildId,
          userId: interaction.user.id,
          itemIdentifier: identifier,
          itemName: item?.itemName,
          itemPrice: item?.itemPrice,
          itemDescription: item?.itemDescription,
          role: item?.role,
          money: item?.money,
        })
          .save()
          .catch((err) => console.log(err));

        await interaction.reply({
          embeds: [
            new EmbedBuilder().setDescription(
              `You have bought ${item?.itemName} for $${item?.itemPrice}! This item has been moved into your inventory.`
            ),
          ],
        });

        break;
      case 'remove':
        if (!(interaction.member && (interaction.member.permissions as Readonly<PermissionsBitField>).has(PermissionFlagsBits.ManageGuild))) {
          return await interaction.reply({
            content: 'You do not have enough permissions to use this command!',
          });
        }

        const ID = interaction.options.getString('identifier');

        if (
          !shop.findOne({
            guildId: interaction.guildId!,
            itemIdentifier: ID,
          })
        ) {
          return await interaction.reply({
            embeds: [new EmbedBuilder().setDescription('That item does not exist.').setColor('Red')],
            ephemeral: true,
          });
        }

        await shop.findOneAndDelete({
          guildId: interaction.guildId!,
          itemIdentifier: ID,
        });

        return await interaction.reply({
          embeds: [new EmbedBuilder().setDescription('Removed that item from the shop!.').setColor('Red')],
          ephemeral: true,
        });
      default:
        break;
    }
  }
);
