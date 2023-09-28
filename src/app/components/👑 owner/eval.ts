import { ChannelType, EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { stripIndent } from 'common-tags';
import sourcebin from 'sourcebin';
import { inspect } from 'util';
module.exports = {
  name: 'eval',
  description: 'Perform evaluations on different codes',
  aliases: ['e', 'evaluate'],
  owner: true,
  cooldown: 5000,
  premium: false,
  category: 'owner',
  examples: [
    `eval [code]`,
    `eval message.channel.send("Hello world!")`,
  ],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    if (!args.length) {
      return message.reply({
        content: [
          `${emojis.error} You must specify code to evaluate in the Discord bot functions!`,
          `**Example:** \`${prefix}eval message.channel.send("Hello world!")\``,
        ].join('\n'),
      });
    }

    try {
      const evaluated = await eval(args.join(' '));
      const output = truncate(inspect(evaluated), 2045);

      if (output.length < 4000) {
        return sendEvalOutput(message, args, output, client);
      }

      await sourcebin
        .create({
          title: `sourcebin-${message.guild?.id}-${message.author.id}`,
          description: `sourcebin output created by ${new Date().toLocaleString()}`,
          files: [
            {
              content: output,
              language: 'javascript',
            },
          ],
        })
        .then(async (value) => {
          sendEvalOutput(message, args, `Output too long: [View Output](${value.url})`, client);
        });
    } catch (error: any) {
      sendEvalError(message, args, error, client);
    }
  },
};

function truncate(texto: string, n: number) {
  return texto.length > n ? texto.substring(0, n) + '...' : texto;
}

function sendEvalOutput(
  message: {
    guild: any;
    author: { username: any; avatarURL: (arg0: { forceStatic: boolean }) => any };
    createdTimestamp: number;
    channel: {
      [x: string]: any;
      send: (arg0: { embeds: EmbedBuilder[] }) => Promise<any>;
    };
  },
  args: any[],
  output: string,
  client: any
) {
  const valueEval = stripIndent`
    Time  ::  ${Date.now() - message.createdTimestamp}ms
    Consume  ::  ${process.memoryUsage().heapUsed / 1024 / 1024}MB
    Day  ::  ${new Date().toLocaleString()}
    Channel Interaction  ::  ${message.channel.type === ChannelType.GuildText ? message.channel.name : 'DMs'},
    Guild  ::  ${message.guild?.name || 'DMs'}
  `;

  const embed = new EmbedBuilder()
    .setAuthor({ name: `Evaluator: ${message.author.username}`, iconURL: message.author.avatarURL({ forceStatic: true }) })
    .setFooter({
      text: `Time: ${Date.now() - message.createdTimestamp}ms`,
      iconURL: message.author.avatarURL({ forceStatic: true }),
    })
    .addFields(
      { name: 'Input', value: `\`\`\`js\n${args.join(' ')}\`\`\`` },
      { name: 'Output', value: `\`\`\`js\n${output}\`\`\`` },
      { name: 'Values', value: `\`\`\`asciidoc\n${valueEval}\`\`\`` }
    )
    .setColor('Green');

  message.channel.send({ embeds: [embed] }).catch(() => {
    const embed1 = new EmbedBuilder()
      .setAuthor({ name: `Evaluator: ${message.author.username}`, iconURL: message.author.avatarURL({ forceStatic: true }) })
      .addFields(
        { name: 'Input', value: `\`\`\`js\n${args.join(' ')}\`\`\`` },
        { name: 'Output', value: `\`\`\`js\n${output.substring(0, 2000)}\`\`\`` }
      )
      .setColor('Orange');

    const embed2 = new EmbedBuilder()
      .setFooter({
        text: `Time: ${Date.now() - message.createdTimestamp}ms`,
        iconURL: message.author.avatarURL({ forceStatic: true }),
      })
      .addFields({ name: 'Output (Continued)', value: `\`\`\`js\n${output.substring(2000, 4000)}\`\`\`` })
      .setColor('Orange');
    message.channel.send({ embeds: [embed1, embed2] });
  });
}

function sendEvalError(
  message: {
    author: { username: any; avatarURL: (arg0: { forceStatic: boolean }) => any };
    createdTimestamp: number;
    channel: { send: (arg0: { embeds: EmbedBuilder[] }) => void };
  },
  args: any[],
  error: { message: string },
  client: any
) {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
  const truncatedError = truncate(errorMessage, 2000);

  const embed = new EmbedBuilder()
    .setAuthor({ name: `Evaluator: ${message.author.username}`, iconURL: message.author.avatarURL({ forceStatic: true }) })
    .setFooter({
      text: `Time: ${Date.now() - message.createdTimestamp}ms`,
      iconURL: message.author.avatarURL({ forceStatic: true }),
    })
    .addFields(
      { name: 'Input', value: `\`\`\`js\n${args.join(' ')}\`\`\`` },
      { name: 'Output', value: `\`\`\`js\n${truncatedError}\`\`\`` },
      { name: 'Error', value: `\`\`\`js\n${error.message.substring(0, 2048)}\`\`\`` }
    )
    .setColor('Red');
  message.channel.send({ embeds: [embed] });
}
