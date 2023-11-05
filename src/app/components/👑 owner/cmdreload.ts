import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { logWithLabel } from '../../../utils/console';
module.exports = {
  name: 'cmdreload',
  description: 'Reload commands indiv] idually with a single command',
  aliases: ['cmd-reload', 'reload-cmd'],
  category: 'owner',
  premium: false,
  cooldown: 20,
  owner: true,
  examples: ['cmdreload help'],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const cmd = args[0];

      if (!cmd)
        return message.channel.send({
          content: [
            `${emojis.error} Please enter the name of the command you want to restart`,
            `> Example: \`${prefix}cmdreload help\``,
          ].join('\n'),
        });

      let reload = false;
      let thecmd =
        client.precommands.get(cmd.toLowerCase()) || client.precommands.get(client.aliases.get(cmd.toLowerCase()));
      if (thecmd) {
        for (let i = 0; i < 10; i += 1) {
          let dir = client.categories[i];
          try {
            delete require.cache[require.resolve(`../../components/${dir}/${thecmd.name}.ts`)];
            client.precommands.delete(thecmd.name);
            const pull = require(`../../components/${dir}/${thecmd.name}.js`);
            client.precommands.set(thecmd.name, pull);
            reload = true;
          } catch {}
        }
      } else {
        return message.channel.send({
          content: [
            `${emojis.error} It seems that an error occurred when trying to restart the command`,
            `> Example: \`${prefix}cmdreload help\``,
          ].join('\n'),
        });
      }
      if (reload)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor('Green')
              .setFooter({ text: message.author.tag, iconURL: client.user.displayAvatarURL() })
              .setDescription(
                [
                  `${emojis.correct} The command \`${cmd}\` has been restarted successfully`,
                  `> Example: \`${prefix}cmdreload help\``,
                ].join('\n')
              ),
          ],
        });
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('Green')
            .setFooter({ text: message.author.tag, iconURL: client.user.displayAvatarURL() })
            .setDescription(
              [
                `${emojis.error} The command \`${cmd}\` does not exist or is not loaded`,
                `> Example: \`${prefix}cmdreload help\``,
              ].join('\n')
            ),
        ],
      });
    } catch (e) {
      logWithLabel('error', `It seems that an error occurred when trying to restart the command ${e}`);
      console.error(e);
    }
  },
};
