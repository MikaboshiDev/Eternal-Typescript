import { HangmanGame, SnakeGame, TicTacToe, RPSGame } from '../../../functions/tools/gamecordClass';
import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';

module.exports = {
  name: 'gamecord',
  description: 'Gamecord is a bot that allows you to play games on Discord.',
  aliases: ['gc'],
  category: 'public',
  examples: [
    'gamecord hangman',
    'gamecord snake',
    'gamecord tictac-toe [oponent]',
  ],
  premium: false,
  cooldown: 5000,
  subcommands: [
    "gamecord hangman",
    "gamecord snake",
    "gamecord tictac-toe [oponent]"
  ],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'hangman':
        {
          new HangmanGame().newGame(message);
        }
        break;
      case 'snake':
        {
          new SnakeGame({
            message: message,
            slash_command: false,
            embed: {
              title: 'Snake',
              color: 'Random',
              overTitle: 'Game Over',
            },
            snake: { head: '🔷', body: '🟦', tail: '🔹', over: '💀' },
            emojis: {
              board: '⬛',
              food: '🍔',
              up: '🔼',
              right: '▶️',
              down: '🔽',
              left: '◀️',
            },
            foods: ['🍎', '🍇', '🍊', '🍕', '🍔', '🥪', '🥙', '🥗', '🥐', '🍿', '🥓', '🌯', '🍗', '🥟'],
            stopButton: 'Stop',
            othersMessage: 'You are not allowed to use buttons for this message!',
          }).startGame();
        }
        break;
      case 'tictac-toe': {
        const opponent = message.mentions.users.first();
        if (!opponent)
          return message.channel.send({
            content: [
              `${emojis.error} **${message.author.username}**, Please mention the user you want to play with!`,
              `Example: \`${prefix}gamecord tictactoe @user\``,
            ].join('\n'),
          });

        new TicTacToe({
          message: message,
          opponent: opponent,
          xColor: 'Danger',
          oColor: 'Success',
          xEmoji: '❌',
          oEmoji: '⭕',
        }).start();
      }
      break;
      case "rps": {
        const opponent = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]);
        if (!opponent) return message.channel.send({
          content: [
            `${emojis.error} **${message.author.username}**, Please mention the user you want to play with!`,
            `Example: \`${prefix}gamecord rps @user\``,
          ].join('\n'),
        })

        new RPSGame({
          message: message,
          opponent: opponent.user,
          embed: {
            title: 'Rock Paper Scissors',
            description: 'Press a button below to make a choice!',
            color: "Random",
          },
          buttons: {
            rock: 'Rock',
            paper: 'Paper',
            scissors: 'Scissors',
          },
          emojis: {
            rock: '🌑',
            paper: '📃',
            scissors: '✂️',
          },
          othersMessage: 'You are not allowed to use buttons for this message!',
          chooseMessage: 'You choose {emoji}!',
          noChangeMessage: 'You cannot change your selection!',
          askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Rock Paper Scissors!',
          cancelMessage: 'Looks like they refused to have a game of Rock Paper Scissors. :(',
          timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
          drawMessage: 'It was a draw!',
          winMessage: '{winner} won the game!',
          gameEndMessage: 'The game went unfinished :(',
        }).startGame();
      }
      break;
    }
  },
};
