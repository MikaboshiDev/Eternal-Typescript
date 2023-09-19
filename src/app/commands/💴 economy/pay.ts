import {
   fetchBalance,
   toFixedNumber,
} from '../../../functions/modules/economy_modules';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import user from '../../../models/economy/user';
import { client } from '../../..';
export default new Command(
   new SlashCommandBuilder()
      .setName('pay')
      .setDescription('pays a user a selected amount')
      .addUserOption((option) =>
         option
            .setName('user')
            .setDescription('Select a user to pay')
            .setRequired(true)
      )
      .addNumberOption((option) =>
         option
            .setName('amount')
            .setDescription('The amount to pay the user')
            .setRequired(true)
            .setMaxValue(1000)
            .setMinValue(1)
      ),
   async (client, interaction) => {
      const member = interaction.options.getUser('user');
      const memberId = member?.id;

      const userBalance = await fetchBalance(
         interaction.user?.id,
         interaction.guildId!
      );
      let amount = interaction.options.getNumber('amount') || 0;

      if (member?.bot || member?.id === interaction.user.id)
         return await interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setDescription('You cant send money to yourself or a bot!')
                  .setColor('Red'),
            ],
            ephemeral: true,
         });

      if (amount > userBalance.balance)
         return await interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setDescription(
                     "You don't have enough money in your balance to pay that user."
                  )
                  .setColor('Red'),
            ],
         });

      const selectedUserBalance = await fetchBalance(
         memberId!,
         interaction.guildId!
      );

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
               .setDescription(
                  `You have successfully transferred $${amount} to ${user}!`
               )
               .setColor('Green'),
         ],
         ephemeral: true,
      });

      const member_send = client.users?.cache.get(
         memberId ? memberId : interaction.user.id
      );
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
);
