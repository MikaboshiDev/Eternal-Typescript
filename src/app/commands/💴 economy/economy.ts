import {
  EmbedBuilder,
  GuildMemberRoleManager,
  PermissionFlagsBits,
  PermissionsBitField,
  SlashCommandBuilder,
} from 'discord.js';
import { fetchBalance, generateToken, getBalance, toFixedNumber } from '../../../functions/modules/economy_modules';
import inventory from '../../../models/economy/inventory';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';
import shop from '../../../models/economy/shop';
import user from '../../../models/economy/user';
import { Types } from 'mongoose';

export default new Command(
  new SlashCommandBuilder()
    .setName('economy')
    .setDescription('💴 The economy sistem of the bot (WIP) (not working yet)')
    .addSubcommandGroup((subCommandGroup) => {
      return subCommandGroup
        .setName('actions')
        .setDescription('💴 Do actions to get money!')
        .addSubcommand((subCommand) => {
          return subCommand
            .setName('balance')
            .setDescription('💴 Returns the balance of a user')
            .addUserOption((option) => option.setName('user').setDescription('💴 Select a user to get the balance of'));
        })
        .addSubcommand((subCommand) => {
          return subCommand
            .setName('pay')
            .setDescription('💴 Pays a user a selected amount')
            .addUserOption((option) =>
              option.setName('user').setDescription('💴 Select a user to pay').setRequired(true)
            )
            .addNumberOption((option) =>
              option
                .setName('amount')
                .setDescription('💴 The amount to pay the user')
                .setRequired(true)
                .setMaxValue(1000)
                .setMinValue(1)
            );
        });
    })
    .addSubcommandGroup((subCommandGroup) => {
      return subCommandGroup
        .setName('inventory')
        .setDescription('💴 Check what items you have that you bought from the shop')
        .addSubcommand((subCommand) => {
          return subCommand
            .setName('view')
            .setDescription('💴 View your inventory')
            .addNumberOption((option) => option.setName('page').setDescription('💴 The page you want to go to'));
        })
        .addSubcommand((subCommand) => {
          return subCommand
            .setName('use_item')
            .setDescription('💴 Use an item from your inventory')
            .addStringOption((str) => {
              return str.setName('identifier').setDescription('💴 Item identifier').setRequired(true);
            });
        });
    })
    .addSubcommandGroup((subCommandGroup) => {
      return subCommandGroup
        .setName('shop')
        .setDescription('💴 View the guild shop or change its settings!')
        .addSubcommand((subCommand) => {
          return subCommand
            .setName('add')
            .setDescription('💴 Add an item to the shop')
            .addStringOption((str) => {
              return str
                .setName('name')
                .setDescription('💴 The name of the product. (not the identifier)')
                .setRequired(true);
            })
            .addStringOption((str) => {
              return str.setName('description').setDescription('💴 The description of the item').setRequired(true);
            })
            .addNumberOption((num) => {
              return num
                .setName('price')
                .setDescription('💴 The price of the item')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(1000000);
            })
            .addRoleOption((option) =>
              option.setName('role').setDescription('💴 Give the user this role when he uses this item!')
            )
            .addNumberOption((option) =>
              option.setName('money').setDescription('💴 Give the user money when he uses this item!')
            )
            .addStringOption((str) => {
              return str
                .setName('identifier')
                .setDescription('💴 The identifier of the product. (if not supplied a token will be generated)')
                .setRequired(false);
            });
        })
        .addSubcommand((subCommand) => {
          return subCommand
            .setName('view')
            .setDescription('💴 Lets you view the shop!')
            .addNumberOption((num) => {
              return num.setName('page').setDescription('💴 The page of the shop you want to view');
            });
        })
        .addSubcommand((subCommand) => {
          return subCommand
            .setName('buy')
            .setDescription('💴 Buy an item from the shop')
            .addStringOption((option) => {
              return option.setName('identifier').setDescription('💴 The identifier of the item you want to buy');
            });
        })
        .addSubcommand((subCommand) => {
          return subCommand
            .setName('remove')
            .setDescription('💴 Remove an item from the shop!')
            .addStringOption((option) => {
              return option.setName('identifier').setDescription('💴 The identifier of the item you want to remove');
            });
        });
    }),
  async (client, interaction) => {
    const subcommandGroup = interaction.options.getSubcommandGroup();
    const { options } = interaction;

    switch (subcommandGroup) {
      case 'shop':
        {
          switch (options.getSubcommand()) {
            case 'add':
              const itemName = options.getString('name');
              const itemDescription = options.getString('description');
              const itemPrice = options.getNumber('price');
              const itemIdentifier = options.getString('identifier') || generateToken(5);
              const money = options.getNumber('money') || null;
              let role = null;
              if (interaction.options.getRole('role')) role = options.getRole('role')?.id;

              if (
                !(
                  interaction.member &&
                  (interaction.member.permissions as Readonly<PermissionsBitField>).has(PermissionFlagsBits.ManageGuild)
                )
              ) {
                return await interaction.reply({
                  content: [
                    `${emojis.error} You do not have enough permissions to use this command!`,
                    `You need the \`MANAGE_GUILD\` permission to use this command!`,
                  ].join('\n'),
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
                    .setDescription(
                      `${emojis.correct} Item added to shop, to view the updated shop please do \`/shop view\`!`
                    )
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
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} There are no items in the shop!`,
                          `To add an item please do \`/shop add\`!`,
                        ].join('\n')
                      )
                      .setColor('Red'),
                  ],
                });

              const embed = new EmbedBuilder()
                .setTitle(`Server Shop`)
                .setDescription(
                  [
                    `To buy an item from the shop please do \`/shop buy\`!`,
                    `To view the next page of the shop please do \`/shop view\`!`,
                  ].join('\n')
                )
                .setColor('Random');

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
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} You already have this item in your inventory!`,
                          `To use this item please do \`/inventory use_item\`!`,
                        ].join('\n')
                      )
                      .setColor('Red'),
                  ],
                });

              if (itemShopData?.itemIdentifier !== identifier)
                return await interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} That item does not exist in the shop!`,
                          `To view the shop please do \`/shop view\`!`,
                        ].join('\n')
                      )
                      .setColor('Red'),
                  ],
                });

              const item = await shop.findOne({
                guildId: interaction.guildId,
                itemIdentifier: identifier,
              });

              if (!item?.itemPrice) {
                if (!item?.role) {
                  return await interaction.reply({
                    embeds: [
                      new EmbedBuilder().setDescription(
                        [`${emojis.error} That item cannot be bought!`, `Its just for display!`].join('\n')
                      ),
                    ],
                  });
                }

                return await interaction.reply({
                  embeds: [
                    new EmbedBuilder().setDescription(
                      [
                        `${emojis.error} That item cannot be bought because it does not have a price!`,
                        `Its just for display and it gives you a role!`,
                      ].join('\n')
                    ),
                  ],
                });
              }

              if (Number(userBalance.balance) < Number(item.itemPrice))
                return await interaction.reply({
                  embeds: [
                    new EmbedBuilder().setDescription(
                      [
                        `${emojis.error} You do not have enough money to buy that item!`,
                        `You need $${item.itemPrice} to buy that item!`,
                      ].join('\n')
                    ),
                  ],
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
                    [
                      `${emojis.error} You have bought ${item?.itemName} for $${item?.itemPrice}! This item has been moved into your inventory.`,
                      `To view your inventory please do \`/inventory view\`!`,
                    ].join('\n')
                  ),
                ],
              });

              break;
            case 'remove':
              if (
                !(
                  interaction.member &&
                  (interaction.member.permissions as Readonly<PermissionsBitField>).has(PermissionFlagsBits.ManageGuild)
                )
              ) {
                return await interaction.reply({
                  content: [
                    `${emojis.error} You do not have enough permissions to use this command!`,
                    `You need the \`MANAGE_GUILD\` permission to use this command!`,
                  ].join('\n'),
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
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} That item does not exist in the shop!`,
                          `To view the shop please do \`/shop view\`!`,
                        ].join('\n')
                      )
                      .setColor('Red'),
                  ],
                  ephemeral: true,
                });
              }

              await shop.findOneAndDelete({
                guildId: interaction.guildId!,
                itemIdentifier: ID,
              });

              return await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setDescription(
                      [
                        `${emojis.correct} Item has been removed from the shop!`,
                        `To view the updated shop please do \`/shop view\`!`,
                      ].join('\n')
                    )
                    .setColor('Red'),
                ],
                ephemeral: true,
              });
            default:
              break;
          }
        }
        break;
      case 'inventory':
        {
          switch (interaction.options.getSubcommand()) {
            case 'view':
              const page = interaction.options.getNumber('page');
              const inventoryData = await inventory.find({
                guildId: interaction.guild?.id,
                userId: interaction.user.id,
              });

              if (!inventoryData?.length)
                return interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} You do not have any items in your inventory!`,
                          `To buy an item from the shop please do \`/shop buy\`!`,
                        ].join('\n')
                      )
                      .setColor('Red'),
                  ],
                });

              const embed = new EmbedBuilder().setTitle(`${interaction.user.username}'s inventory`).setColor(0x2f3136);

              if (page) {
                const pageNum = 5 * page - 5;

                if (inventoryData.length >= 6) {
                  embed.setFooter({
                    text: `page ${page} of ${Math.ceil(inventoryData.length / 5)}`,
                  });
                }

                for (const item of inventoryData.splice(pageNum, 5)) {
                  embed.addFields({
                    name: `<:note_emoji_2:1028290390194929814>  ${item._id}`,
                    value: [
                      `<:replycontinued:1015235683209707534> Item Name: ${item.itemName}`,
                      `<:replycontinued:1015235683209707534> Item Description: ${item.itemDescription}`,
                      `<:replycontinued:1015235683209707534> Item Price: ${item.itemPrice}`,
                      `<:replycontinued:1015235683209707534> Item Identifier: ${item.itemIdentifier}`,
                    ].join('\n'),
                  });
                }

                return await interaction.reply({ embeds: [embed] });
              }

              if (inventoryData.length >= 6) {
                embed.setFooter({
                  text: `page 1 of ${Math.ceil(inventoryData.length / 5)}`,
                });
              }

              for (const item of inventoryData.slice(0, 5)) {
                embed.addFields({
                  name: `${item.itemName}  <->  $${item.itemPrice}`,
                  value: `> Identifier: \`${item.itemIdentifier}\`\n> Description: ${item.itemDescription}\n> Given Role: ${item.role}\n> Given Money: ${item.money}\n`,
                });
              }

              await interaction.reply({ embeds: [embed] });
              break;
            case 'use_item':
              const identifier = interaction.options.getString('identifier');
              const invSchema = await inventory.findOne({
                guildId: interaction.guild?.id,
                userId: interaction.user.id,
              });

              if (!invSchema || invSchema?.itemIdentifier !== identifier) {
                return interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} That item does not exist in your inventory!`,
                          `To view your inventory please do \`/inventory view\`!`,
                        ].join('\n')
                      )
                      .setColor('Red'),
                  ],
                });
              }

              const item = await inventory.findOne({
                guildId: interaction.guild?.id,
                userId: interaction.user.id,
                itemIdentifier: identifier,
              });

              if (!item?.role && !item?.money)
                return await interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription([`${emojis.error} That item cannot be used!`, `Its just for display!`].join('\n'))
                      .setColor('Red'),
                  ],
                });

              if (item.role) {
                const memberRoles = interaction.member?.roles;

                if (memberRoles instanceof GuildMemberRoleManager) {
                  await memberRoles.add(item.role).catch((err: string) => {
                    interaction.reply({
                      content:
                        "ERROR: I cannot give you the role. It might be because I don't have permissions to or that I am not above the role. Contact the admins of this server and ask them to fix this.",
                    });

                    return console.log(err);
                  });
                }

                await inventory.findOneAndDelete({ _id: item._id });

                return interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} The role: ${interaction.guild?.roles.cache.get(
                            item.role
                          )} has been given to you!`,
                          `This item has been removed from your inventory!`,
                        ].join('\n')
                      )
                      .setColor('Green'),
                  ],
                  ephemeral: true,
                });
              }

              if (item.money) {
                const selectedUserBalance = await fetchBalance(interaction.user.id, interaction.guildId!);

                await user.findOneAndUpdate(
                  { _id: selectedUserBalance._id },
                  {
                    balance: await toFixedNumber(selectedUserBalance.balance + item.money),
                  }
                );

                await inventory.findOneAndDelete({
                  _id: item._id,
                });

                return interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.correct} You have been given $${item.money}!`,
                          `This item has been removed from your inventory!`,
                        ].join('\n')
                      )
                      .setColor('Green'),
                  ],
                  ephemeral: true,
                });
              }

              break;

            default:
              break;
          }
        }
        break;
      case 'actions':
        {
          switch (interaction.options.getSubcommand()) {
            case 'balance':
              {
                const user = interaction.options.getUser('user') || interaction.user;
                const guildId = interaction.guild?.id!;
                const dbBalance = await getBalance(user.id, guildId);
                if (!dbBalance) {
                  return await interaction.reply({
                    embeds: [
                      new EmbedBuilder().setDescription(
                        [
                          `Oops! ${user.tag} does not have a balance yet. A reason for this is they might have not talked in this server yet or the admins removed his balance!`,
                          `To give them a balance please do \`/economy give\`!`,
                        ].join('\n')
                      ),
                    ],
                    ephemeral: true,
                  });
                }

                await interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle(`${user.username}'s balance`)
                      .setDescription(`**User has $${dbBalance.balance}**`)
                      .setFooter({
                        text: user.tag,
                        iconURL: user.displayAvatarURL(),
                      })
                      .setColor('Random')
                      .setTimestamp(),
                  ],
                });
              }
              break;
            case 'pay': {
              const member = interaction.options.getUser('user');
              const memberId = member?.id;

              const userBalance = await fetchBalance(interaction.user?.id, interaction.guildId!);
              let amount = interaction.options.getNumber('amount') || 0;

              if (member?.bot || member?.id === interaction.user.id)
                return await interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} You cannot pay that user!`,
                          `They are either a bot or you are trying to pay yourself!`,
                        ].join('\n')
                      )
                      .setColor('Red'),
                  ],
                  ephemeral: true,
                });

              if (amount > userBalance.balance)
                return await interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setDescription(
                        [
                          `${emojis.error} You do not have enough money to pay that user!`,
                          `You need $${amount} to pay that user!`,
                        ].join('\n')
                      )
                      .setColor('Red'),
                  ],
                });

              const selectedUserBalance = await fetchBalance(memberId!, interaction.guildId!);

              amount = await toFixedNumber(amount);

              await user.findOneAndUpdate(
                { _id: userBalance._id },
                { balance: await toFixedNumber(userBalance.balance - amount) }
              );

              await user.findOneAndUpdate(
                { _id: selectedUserBalance._id },
                {
                  balance: await toFixedNumber(selectedUserBalance.balance + amount),
                }
              );

              await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setDescription(`You have successfully transferred $${amount} to ${user}!`)
                    .setColor('Green'),
                ],
                ephemeral: true,
              });

              const member_send = client.users?.cache.get(memberId ? memberId : interaction.user.id);
              await member_send?.send({
                embeds: [
                  new EmbedBuilder()
                    .setDescription(
                      `You have received a total of ${amount} from ${
                        interaction.user
                      }! This amount has been deposited to your balance and you total now is $${
                        selectedUserBalance.balance + amount
                      }`
                    )
                    .setColor('Green')
                    .setImage(
                      'https://cdn.discordapp.com/attachments/1098838797229236315/1098864088639078481/money-banner.png'
                    ),
                ],
              });
            }
          }
        }
        break;
    }
  }
);
