import { ChannelType, EmbedBuilder, Message, codeBlock } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
const api = 'https://dattebayo-api.onrender.com/';
import axios, { AxiosResponse } from 'axios';
module.exports = {
  name: 'naruto',
  description: 'The command sends a random naruto image/gif',
  aliases: ['naruto'],
  category: 'interactions',
  premium: false,
  cooldown: 5000,
  subcommands: ['naruto clans: Shows all the clans of naruto'],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'clans': {
        const response = axios({
          method: 'GET',
          url: `${api}/clans`,
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res: AxiosResponse) => {
          const nameClanes = res.data
            .map((clan: { name: any; id: any }, index: number) => {
              return `\`No. ${index + 1}\` - ${clan.name} - ${clan.id}`;
            })
            .join('\n');
          const embed = new EmbedBuilder()
            .setTitle('Naruto Clans')
            .setDescription(nameClanes)
            .setColor('Random')
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL({ forceStatic: true }),
            });

          message.channel.send({ embeds: [embed] });
        });
      }
    }
  },
};
