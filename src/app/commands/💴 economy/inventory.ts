import { EmbedBuilder, GuildMemberRoleManager, SlashCommandBuilder } from 'discord.js';
import { fetchBalance, toFixedNumber } from '../../../functions/modules/economy_modules';
import inventory from '../../../models/economy/inventory';
import { Command } from '../../../class/builders';
import user from '../../../models/economy/user';
export default new Command(
  new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('Check what items you have that you bought from the shop')
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('view')
        .setDescription('view your inventory')
        .addNumberOption((option) => option.setName('page').setDescription('The page you want to go to'));
    })
    .addSubcommand((subCommand) => {
      return subCommand
        .setName('use_item')
        .setDescription('use an item from your inventory')
        .addStringOption((str) => {
          return str.setName('identifier').setDescription('Item identifier').setRequired(true);
        });
    }),
  async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case 'view':
        const page = interaction.options.getNumber('page');
        const inventoryData = await inventory.find({
          guildId: interaction.guild?.id,
          userId: interaction.user.id,
        });

        if (!inventoryData?.length)
          return interaction.reply({
            embeds: [new EmbedBuilder().setDescription("you don't have any item in your inventory!").setColor('Red')],
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
              new EmbedBuilder().setDescription('You have not bought that item from the shop yet or that item does not exist!').setColor('Red'),
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
            embeds: [new EmbedBuilder().setDescription('That item cannot be used its just for display!').setColor('Red')],
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
                .setDescription(`The role: ${interaction.guild?.roles.cache.get(item.role)} has been given to you!`)
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
            embeds: [new EmbedBuilder().setDescription(`$${item.money} has been added to your balance!`).setColor('Green')],
            ephemeral: true,
          });
        }

        break;

      default:
        break;
    }
  }
);
