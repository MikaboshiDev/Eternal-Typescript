import { economyData } from '../../../functions/tools/funcion_economy';
import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/economy';
import { duration } from 'moment';

var trabajos = [
    "Truck Driver",
    "Developer",
    "Mechanic",
    "Taxi Driver",
    "Stripper",
    "Chef",
    "Carpenter",
    "Fisherman",
    "Hunter",
    "Scientist",
    "Police Officer",
    "Doctor",
    "Singer",
    "Firefighter",
    "Pilot",
    "Singer",
    "Bartender",
    "Cashier",
];

module.exports = {
  name: 'work',
  description: 'Work to claim more money on your journey',
  aliases: ['w', "trabajar"],
  category: 'economy',
  premium: false,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
            try {
              const data = await model.findOne({ userID: message.author.id });
              if (!data)
                return message.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setAuthor({
                        name: `Server economy error`,
                        iconURL: message.author.avatarURL({ forceStatic: true }) as any,
                      })
                      .setFooter({
                        text: `Server economy error`,
                        iconURL: message.author.avatarURL({ forceStatic: true }) as any,
                      })
                      .setDescription(
                        [
                          `${emojis.error} Hello **${message.author.username}** I'm sorry but you don't have economy system created in my database`,
                          `please try again later or contact server support`,
                        ].join('\n')
                      )
                      .setColor('Red')
                      .setTimestamp(),
                  ],
                });

              if (data.retired === true)
                return message
                  .reply({
                    content: [
                      `${emojis.error} I'm sorry but you already retired from heavy work it's a shame but you can't work anymore`,
                      `thank you very much for living with me`,
                    ].join('\n'),
                  })
                  .catch((err) => {});

              let tiempo_ms = 3 * 60 * 60 * 1000;
              let recompensa = Math.floor(Math.random() * 800) + 200;
              let trabajo = trabajos[Math.floor(Math.random() * trabajos.length)];


              const probabilidades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
              const random = probabilidades[Math.floor(Math.random() * probabilidades.length)];

              await model.findOneAndUpdate(
                { userID: message.author.id },
                {
                  $inc: {
                    money: recompensa * random,
                  },
                  work: Date.now(),
                }
              );

              return message.reply({
                content: [
                  `Hello ${message.author} you are lucky you have worked \`${trabajo}\` with a salary increase of \`${random}\` thank you very much`,
                  `for enjoying us in the economy come back later with us`,
                ].join('\n'),
              });
            } catch (e) {
              message.channel.send({
                content: [
                  `${emojis.error} An error has occurred while executing the command, please try again later`,
                  `**Error Time:** ${Date.now() - message.createdTimestamp}ms`,
                ].join('\n'),
              });
            }
  },
};