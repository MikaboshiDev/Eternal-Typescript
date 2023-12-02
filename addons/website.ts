/*
# Discord Server: https://discord.gg/pgDje8S3Ed
# Github: https://github.com/MikaboshiDev
# Docs: https://docs.night-support.xyz/
# Dashboard: http://www.night-support.xyz/

# Created by: MikaboshiDev
# Version: 0.0.2
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/

import { WebhookClient, EmbedBuilder } from 'discord.js';
import { logWithLabel } from '../src/utils/console';
import { config } from '../src/utils/config';
import { stripIndent } from 'common-tags';
import axios from 'axios';

module.exports = (client: any) => {
  const postStats = async () => {
    try {
      const api = '/applications/:id';
      const response = await axios.post(
        api,
        {
          username: client.user.username,
          id: client.user.id,
          description: '',
          image: client.user.displayAvatarURL({ forceStatic: true }),
          prefix: '!',
          website: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
        }
      );

      const webhook = new WebhookClient({
        id: config.systems.webhook_id!,
        token: config.systems.webhook_token!,
      });

      const data = stripIndent`
        Username: ${client.user.username}
        ID: ${client.user.id}
        Description: ""
        Image: ${client.user.displayAvatarURL({ forceStatic: true })}
        Prefix: "!"
        Website: ""
        Created At: ${client.user.createdAt}
        Guilds: ${client.guilds.cache.size}
        Users: ${client.users.cache.size}
        Channels: ${client.channels.cache.size}
      `;

      const embed = new EmbedBuilder()
        .setTitle('New - Application')
        .setDescription(`\`\`\`asciidoc\n${data}\`\`\``)
        .setFooter({ text: 'Request by: ' + response.data.username, iconURL: response.data.image })
        .setColor('Green');

      webhook.send({ embeds: [embed] });
    } catch (error) {
      logWithLabel('error', `Error while posting to /applications/:id`);
      console.error(error);
    }
  };

  setInterval(() => {
    logWithLabel('websocket', `Posting stats to ${config.systems.webhook_id}`);
    if (config.systems.webhook_id === '' || config.systems.webhook_token === '') {
      logWithLabel('error', 'No webhook id or token found in .env file');
      return;
    }

    if (!client.user) {
      logWithLabel('error', 'Client user is null or undefined');
      return;
    }

    postStats();
  }, 1000 * 60 * 60 * 24);
};
