import { EmbedBuilder, Message } from 'discord.js';
import { request } from 'https';
import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'minecraft',
  description: 'minecraft commands for searches, research, images and more',
  aliases: ['mc', 'minecraft-cmd'],
  category: 'interactions',
  premium: false,
  cooldown: 20,
  examples: ['minecraft [subcommand] [name]', 'minecraft skin [name]'],
  subcommands: ['minecraft skin [target mc]', 'minecraft server [target mc]'],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    try {
      const subcommand = args[0];
      switch (subcommand) {
        case 'skin':
          {
            const uuid = args.join(' ').slice(5);
            const req = request(
              {
                hostname: 'sessionserver.mojang.com',
                path: '/session/minecraft/profile/' + encodeURIComponent(uuid),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              },
              (res) => {
                let data: string = '';

                res.on('data', (chunk) => {
                  data += chunk;
                });

                res.once('end', () => {
                  const response = JSON.parse(data);
                  if (res.statusCode !== 200) {
                    console.error(response);
                    return message.channel.send({
                      content: [
                        `${emojis.error} The error code is ${res.statusCode} and the error is:`,
                        'this is not a valid uuid',
                      ].join('\n'),
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setColor('#00b300')
                    .setTitle(response.name ?? null)
                    .setAuthor({ name: 'Minecraft info', url: 'https://github.com/Jystro/Minecraft-info-bot' })
                    .setDescription(response?.name + ' profile')
                    .setThumbnail('https://crafatar.com/avatars/' + uuid + '.png?overlay')
                    .setFields([
                      {
                        name: 'Name',
                        value: response?.name ?? 'unknown',
                      },
                      {
                        name: 'UUID',
                        value: uuid,
                      },
                      {
                        name: 'Skin',
                        value: 'https://crafatar.com/skins/' + response.id + '.png',
                      },
                    ])
                    .setImage('https://crafatar.com/renders/body/' + response.id + '.png?overlay')
                    .setTimestamp(new Date())
                    .setFooter({ text: 'Minecraft info bot\nData updated every 20 minutes' });

                  let capeUrl = 'https://crafatar.com/capes/' + response.id + '.png';
                  const capeReq = request(capeUrl, (res) => {
                    if (res.statusCode === 200) {
                      embed.addFields({ name: 'Cape', value: capeUrl });
                    }
                  });
                  capeReq.on('error', (err) => {
                    console.log(err);
                    message.reply({
                      content: [
                        `${emojis.error} The error is command and error this is:`,
                        `the contact support server discord`,
                      ].join('\n'),
                    });
                  });
                  capeReq.end();
                  message.channel.send({ embeds: [embed] });
                });
              }
            );
          }
          break;
      }
    } catch (err) {
      logWithLabel('error', `Error executing 'minecraft' command: ${err}`);
      message.channel.send({
        content: [
          `${emojis.error} An error has occurred while executing the command`,
          `Please try again later or contact the support team`,
        ].join('\n'),
      });
    }
  },
};
