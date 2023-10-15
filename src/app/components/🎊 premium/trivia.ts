import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Embed, EmbedBuilder, Message } from 'discord.js';
import { decode } from 'html-entities';
import fetch from 'node-fetch';
module.exports = {
  name: 'trivia',
  description: 'Play the trivia game within the discord server',
  aliases: ['game-trivia', 'trivia-game'],
  category: 'premium',
  premium: true,
  cooldown: 5000,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const getRandomString = (length: number) => {
      const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      return result;
    };

    const shuffleArray = (array: any) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    const convertTime = (time: number) => {
      const absoluteSeconds = Math.floor((time / 1000) % 60);
      const absoluteMinutes = Math.floor((time / (1000 * 60)) % 60);
      const absoluteHours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const absoluteDays = Math.floor(time / (1000 * 60 * 60 * 24));
      const d = absoluteDays ? (absoluteDays === 1 ? '1 day' : `${absoluteDays} days`) : null;
      const h = absoluteHours ? (absoluteHours === 1 ? '1 hour' : `${absoluteHours} hours`) : null;
      const m = absoluteMinutes ? (absoluteMinutes === 1 ? '1 minute' : `${absoluteMinutes} minutes`) : null;
      const s = absoluteSeconds ? (absoluteSeconds === 1 ? '1 second' : `${absoluteSeconds} seconds`) : null;
      const absoluteTime = [];
      if (d) absoluteTime.push(d);
      if (h) absoluteTime.push(h);
      if (m) absoluteTime.push(m);
      if (s) absoluteTime.push(s);
      return absoluteTime.join(', ');
    };

    const id1 = getRandomString(20) + '-' + getRandomString(20) + '-' + getRandomString(20) + '-' + getRandomString(20);
    const id2 = getRandomString(20) + '-' + getRandomString(20) + '-' + getRandomString(20) + '-' + getRandomString(20);
    const id3 = getRandomString(20) + '-' + getRandomString(20) + '-' + getRandomString(20) + '-' + getRandomString(20);
    const id4 = getRandomString(20) + '-' + getRandomString(20) + '-' + getRandomString(20) + '-' + getRandomString(20);
    const question = {
      question: '',
      difficulty: '',
      correct: 0,
      options: [],
    };

    await fetch(`https://opentdb.com/api.php?amount=1&type=multiple&difficulty=hard`)
      .then((res) => res.json())
      .then(async (res) => {
        const q = [];
        q.push(res.results[0]);
        question.question = res.results[0].question;
        question.difficulty = res.results[0].difficulty;
        await q[0].incorrect_answers.push(q[0].correct_answer);
        const shuffledArray = shuffleArray(q[0].incorrect_answers);
        question.correct = shuffledArray.indexOf(res.results[0].correct_answer);
        question.options = shuffledArray;
      });

    let winningID: string;
    if (question.correct === 0) {
      winningID = id1;
    } else if (question.correct === 1) {
      winningID = id2;
    } else if (question.correct === 2) {
      winningID = id3;
    } else if (question.correct === 3) {
      winningID = id4;
    }

    let btn = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('1️⃣').setCustomId(id1);
    let btn2 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('2️⃣').setCustomId(id2);
    let btn3 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('3️⃣').setCustomId(id3);
    let btn4 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('4️⃣').setCustomId(id4);
    let row = new ActionRowBuilder().addComponents(btn, btn2, btn3, btn4);

    let opt = '';
    for (let i = 0; i < question.options.length; i++) {
      opt += `**${i + 1})** ${decode(question.options[i])}\n`;
    }

    message
      .reply({
        embeds: [
          new EmbedBuilder().setTitle('🕹️・Trivia').setFields({
            name: `${decode(question.question)}`,
            value: `You only have **${convertTime(60000)}** to guess the answer!\n\n${opt}`,
          }),
        ],
        components: [row as any],
      })
      .then(async (m) => {
        const gameCreatedAt = Date.now();

        const collector = message.channel.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 60000,
        });

        collector.on('collect', async (trivia) => {
          if (trivia.user.id !== message.author.id) return;

          trivia.deferUpdate();

          if (trivia.customId === winningID) {
            let fbtn1 = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setLabel('1️⃣')
              .setCustomId(id1)
              .setDisabled(true);
            let fbtn2 = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setLabel('2️⃣')
              .setCustomId(id2)
              .setDisabled(true);
            let fbtn3 = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setLabel('3️⃣')
              .setCustomId(id3)
              .setDisabled(true);
            let fbtn4 = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setLabel('4️⃣')
              .setCustomId(id4)
              .setDisabled(true);

            collector.stop();

            if (winningID === id1) {
              fbtn1.setStyle(ButtonStyle.Success);
              fbtn2.setStyle(ButtonStyle.Danger);
              fbtn3.setStyle(ButtonStyle.Danger);
              fbtn4.setStyle(ButtonStyle.Danger);
            } else if (winningID === id2) {
              fbtn1.setStyle(ButtonStyle.Danger);
              fbtn2.setStyle(ButtonStyle.Success);
              fbtn3.setStyle(ButtonStyle.Danger);
              fbtn4.setStyle(ButtonStyle.Danger);
            } else if (winningID === id3) {
              fbtn1.setStyle(ButtonStyle.Danger);
              fbtn2.setStyle(ButtonStyle.Danger);
              fbtn3.setStyle(ButtonStyle.Success);
              fbtn4.setStyle(ButtonStyle.Danger);
            } else if (winningID === id4) {
              fbtn1.setStyle(ButtonStyle.Danger);
              fbtn2.setStyle(ButtonStyle.Danger);
              fbtn3.setStyle(ButtonStyle.Danger);
              fbtn4.setStyle(ButtonStyle.Success);
            }

            const time = convertTime(Date.now() - gameCreatedAt);
            m.edit({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`🕹️・Trivia`)
                  .setDescription(
                    `GG, It was **${question.options[question.correct]}**. You gave the correct answer in **${time}**.`
                  ),
              ],
              components: [fbtn1, fbtn2, fbtn3, fbtn4 as any],
            });
          } else {
            let fbtn1 = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setLabel('1️⃣')
              .setCustomId(id1)
              .setDisabled(true);
            let fbtn2 = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setLabel('2️⃣')
              .setCustomId(id2)
              .setDisabled(true);
            let fbtn3 = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setLabel('3️⃣')
              .setCustomId(id3)
              .setDisabled(true);
            let fbtn4 = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setLabel('4️⃣')
              .setCustomId(id4)
              .setDisabled(true);

            collector.stop();

            if (winningID === id1) {
              fbtn1.setStyle(ButtonStyle.Success);
              if (trivia.customId === id2) {
                fbtn2.setStyle(ButtonStyle.Danger);
                fbtn3.setStyle(ButtonStyle.Secondary);
                fbtn4.setStyle(ButtonStyle.Secondary);
              } else if (trivia.customId === id3) {
                fbtn2.setStyle(ButtonStyle.Secondary);
                fbtn3.setStyle(ButtonStyle.Danger);
                fbtn4.setStyle(ButtonStyle.Secondary);
              } else if (trivia.customId === id4) {
                fbtn2.setStyle(ButtonStyle.Secondary);
                fbtn3.setStyle(ButtonStyle.Secondary);
                fbtn4.setStyle(ButtonStyle.Danger);
              }
            } else if (winningID === id2) {
              fbtn2.setStyle(ButtonStyle.Success);
              if (trivia.customId === id1) {
                fbtn1.setStyle(ButtonStyle.Danger);
                fbtn3.setStyle(ButtonStyle.Secondary);
                fbtn4.setStyle(ButtonStyle.Secondary);
              } else if (trivia.customId === id3) {
                fbtn1.setStyle(ButtonStyle.Secondary);
                fbtn3.setStyle(ButtonStyle.Danger);
                fbtn4.setStyle(ButtonStyle.Secondary);
              } else if (trivia.customId === id4) {
                fbtn1.setStyle(ButtonStyle.Secondary);
                fbtn3.setStyle(ButtonStyle.Secondary);
                fbtn4.setStyle(ButtonStyle.Danger);
              }
            } else if (winningID === id3) {
              fbtn3.setStyle(ButtonStyle.Success);
              if (trivia.customId === id1) {
                fbtn1.setStyle(ButtonStyle.Danger);
                fbtn2.setStyle(ButtonStyle.Secondary);
                fbtn4.setStyle(ButtonStyle.Secondary);
              } else if (trivia.customId === id2) {
                fbtn1.setStyle(ButtonStyle.Secondary);
                fbtn2.setStyle(ButtonStyle.Danger);
                fbtn4.setStyle(ButtonStyle.Secondary);
              } else if (trivia.customId === id4) {
                fbtn1.setStyle(ButtonStyle.Secondary);
                fbtn2.setStyle(ButtonStyle.Secondary);
                fbtn4.setStyle(ButtonStyle.Danger);
              }
            } else if (winningID === id4) {
              fbtn4.setStyle(ButtonStyle.Success);
              if (trivia.customId === id1) {
                fbtn1.setStyle(ButtonStyle.Danger);
                fbtn2.setStyle(ButtonStyle.Secondary);
                fbtn3.setStyle(ButtonStyle.Secondary);
              } else if (trivia.customId === id2) {
                fbtn1.setStyle(ButtonStyle.Secondary);
                fbtn2.setStyle(ButtonStyle.Danger);
                fbtn3.setStyle(ButtonStyle.Secondary);
              } else if (trivia.customId === id3) {
                fbtn1.setStyle(ButtonStyle.Secondary);
                fbtn2.setStyle(ButtonStyle.Secondary);
                fbtn3.setStyle(ButtonStyle.Danger);
              }
            }

            m.edit({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`🕹️・Trivia`)
                  .setDescription(
                    `Better luck next time! The correct answer was **${question.options[question.correct]}**.`
                  ),
              ],
              components: [fbtn1, fbtn2, fbtn3, fbtn4 as any],
            });
          }
        });

        collector.on('end', (trivia, reason) => {
          if (reason === 'time') {
            let fbtn1 = new ButtonBuilder()
              .setLabel('1️⃣')
              .setStyle(ButtonStyle.Primary)
              .setCustomId(id1)
              .setDisabled(true);
            let fbtn2 = new ButtonBuilder()
              .setLabel('2️⃣')
              .setStyle(ButtonStyle.Primary)
              .setCustomId(id2)
              .setDisabled(true);
            let fbtn3 = new ButtonBuilder()
              .setLabel('3️⃣')
              .setStyle(ButtonStyle.Primary)
              .setCustomId(id3)
              .setDisabled(true);
            let fbtn4 = new ButtonBuilder()
              .setLabel('4️⃣')
              .setStyle(ButtonStyle.Primary)
              .setCustomId(id4)
              .setDisabled(true);

            if (winningID === id1) {
              fbtn1.setStyle(ButtonStyle.Success);
              fbtn2.setStyle(ButtonStyle.Secondary);
              fbtn3.setStyle(ButtonStyle.Secondary);
              fbtn4.setStyle(ButtonStyle.Secondary);
            } else if (winningID === id2) {
              fbtn1.setStyle(ButtonStyle.Secondary);
              fbtn2.setStyle(ButtonStyle.Success);
              fbtn3.setStyle(ButtonStyle.Secondary);
              fbtn4.setStyle(ButtonStyle.Secondary);
            } else if (winningID === id3) {
              fbtn1.setStyle(ButtonStyle.Secondary);
              fbtn2.setStyle(ButtonStyle.Secondary);
              fbtn3.setStyle(ButtonStyle.Success);
              fbtn4.setStyle(ButtonStyle.Secondary);
            } else if (winningID === id4) {
              fbtn1.setStyle(ButtonStyle.Secondary);
              fbtn2.setStyle(ButtonStyle.Secondary);
              fbtn3.setStyle(ButtonStyle.Secondary);
              fbtn4.setStyle(ButtonStyle.Success);
            }

            m.edit({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`🕹️・Trivia`)
                  .setDescription(
                    `Better luck next time! The correct answer was **${question.options[question.correct]}**.`
                  ),
              ],
              components: [fbtn1, fbtn2, fbtn3, fbtn4 as any],
            });
          }
        });
      });
  },
};
