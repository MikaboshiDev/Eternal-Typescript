import { economyData } from '../../../functions/tools/funcion_economy';
import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/economy';

const transfer_error = {
  noUserMentioned: `${emojis.error} You haven't mentioned anyone to send money to.`,
  cannotSendToBot: `${emojis.error} You can't send money to a bot.`,
  invalidAmount: `${emojis.error} You haven't specified a valid amount to send.`,
  notEnoughMoney: `${emojis.error} You must have the money in your bank or you don't have enough money to send.`,
};

module.exports = {
  name: 'transfer',
  description: 'Make deposits to other users from your card',
  aliases: ['paypal'],
  category: 'economy',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const sendEmbed = (title: string, desc: string, thumbnail: string) => {
      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(desc)
        .setThumbnail(thumbnail)
        .setFooter({
          text: 'Express Discord Economy Bots',
          iconURL: message.guild?.iconURL({ forceStatic: true }) as any,
        })
        .setTimestamp()
        .setColor('Random');
      return embed;
    };

    const data = await model.findOne({ userID: message.author.id });
    await economyData(client, message, message.author);
    if (!data) return;

    const user = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]);
    if (!user) return message.reply({ content: transfer_error.noUserMentioned });
    if (user.user.bot) return message.reply({ content: transfer_error.cannotSendToBot });

    const amount = ['all', 'all-in', 'todo'].includes(args[0]) ? data.money : args[0] ? parseInt(args[0]) : false;
    if (!amount) return message.reply({ content: transfer_error.invalidAmount });
    if (isNaN(amount) || amount <= 0 || amount % 1 !== 0 || data.money === 0)
      return message.reply({ content: transfer_error.invalidAmount });
    if (amount > data.bank) return message.reply({ content: transfer_error.notEnoughMoney });

    await model.findOneAndUpdate(
      { userID: user.user.id },
      {
        $inc: { bank: amount },
        rob: Date.now(),
      }
    );
    await model.findOneAndUpdate(
      { userID: message.author.id },
      {
        $inc: { bank: -amount },
      }
    );

    client.users.cache
      .get(user.user.id)
      .send({
        embeds: [
          sendEmbed(
            'You have received a transfer!',
            `Hello ${user}!\n\nUser ${message.author} has sent you a transfer of \`${amount}\` coins.\n\n*It is now available in your bank account.*`,
            message.author.displayAvatarURL({ forceStatic: true })
          ),
        ],
      })
      .catch(() => {});

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Express Discord Transfers')
          .setDescription('Information about the transfer made!')
          .addFields(
            { name: '`•` Sending User', value: `${message.author} **(Owner)**`, inline: true },
            { name: '`•` Receiving User', value: `${user} **(User)**`, inline: true },
            { name: '`•` Amount Sent', value: `\`${amount}\` **Coins ${emojis.coin}**`, inline: true }
          )
          .setDescription('*The transfer is visible from the time it is sent.*')
          .setColor('Random')
          .setThumbnail(message.author.displayAvatarURL({ forceStatic: true }))
          .setFooter({
            text: 'Express Discord Economy Bots',
            iconURL: message.guild?.iconURL({ forceStatic: true }) as any,
          }),
      ],
    });
  },
};
