import { Message } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'reloadallcmd',
  description: 'Reload all commands (owner only)',
  aliases: ['reloadallcommands', 'reloadallcmds'],
  category: 'owner',
  premium: false,
  cooldown: 20,
  owner: true,
  examples: ['reloadallcmd'],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      let t = await message.reply({
        content: [
          `${emojis.error} Now reloading all Commands, can take up to 10 Seconds!`,
          `> ***This Command is only for the Owner of the Bot!***`,
        ].join('\n'),
      });
      client.precommands.clear();
      client.aliases.clear();
      const { readdirSync } = require('fs');
      readdirSync('./src/app/components/').forEach((dir: any) => {
        const commands = readdirSync(`./src/app/components/${dir}/`).filter((file: any) => file.endsWith('.ts'));
        for (let file of commands) {
          try {
            delete require.cache[require.resolve(`../../components/${dir}/${file}`)];
            let pull = require(`../../components/${dir}/${file}`);
            if (pull.name) {
              client.precommands.set(pull.name, pull);
              logWithLabel('info', `Reloaded Command: ${pull.name}`);
            } else {
              logWithLabel(
                'error',
                `Error while reloading commands: ${file} doesn't have a help.name or help.name is not a string.`
              );
              continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases))
              pull.aliases.forEach((alias: any) => client.aliases.set(alias, pull.name));
          } catch (e) {
            logWithLabel('error', `Error while reloading commands: ${e}`);
          }
        }
      });
      await t.edit({
        content: [
          `${emojis.correct} Loaded ${client.precommands.size} Commands and ${client.aliases.size} Aliases!`,
          `> ***This Command is only for the Owner of the Bot!***`,
        ].join('\n'),
      });
    } catch (e) {
      logWithLabel('error', `Error while reloading commands: ${e}`);
      console.error(e);
    }
  },
};
