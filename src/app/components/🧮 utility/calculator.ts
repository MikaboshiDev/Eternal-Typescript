import { EmbedBuilder, Message } from 'discord.js';
import { evaluate } from 'mathjs';
import emojis from '../../../../config/emojis.json';
module.exports = {
  name: 'calculator',
  description: 'Calculator the given expression (e.g. 1 + 1)',
  aliases: ['cls', 'calculate', 'calc'],
  category: 'utility',
  async execute(client: any, message: Message, args: string[]) {
    const expression = args.join(' ');
    if (!expression)
      return message.channel.send({
        content: [
          `${emojis.error} **Please provide a valid expression to calculate!**`,
          `> **Usage:** \`calculator <expression>\``,
        ].join('\n'),
      });

    const result = evaluate(expression);
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('Calculator')
      .setDescription('Here is the result of your calculation')
      .addFields({ name: 'Expression', value: `${expression}` }, { name: 'Result', value: `\`\`\`js\n${result}\`\`\`` })
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ forceStatic: true }),
      });

    message.channel.send({ embeds: [embed] });
  },
};
