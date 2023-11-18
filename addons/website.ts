import { WebhookClient, EmbedBuilder } from 'discord.js';
import { logWithLabel } from '../src/utils/console';
import { stripIndent } from 'common-tags';
import axios from 'axios';
import { config } from '../src/utils/config';

module.exports = (client: any) => {
  async function postStats() {
    const api = '/aplications/:id';
    const request = axios({
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      data: {
        username: client.user.username,
        id: client.user.id,
        description: '',
        image: client.user.displayAvatarURL({ forceStatic: true }),
        prefix: '!',
        website: '',
      },
    });

    request
      .then((response: any) => {
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
      })
      .catch((error: any) => {
        logWithLabel('error', `Error while posting to ${api}`);
        console.log(error);
      });
  }

  setInterval(() => {
    logWithLabel("websocket", `Posting stats to ${config.systems.webhook_id}`);
    if (config.systems.webhhok_id === "" || config.systems.webhook_token === "") {
        logWithLabel("error", "No webhook id or token found in .env file");
        return;
    }

    if (client.user === null) {
        logWithLabel('error', 'Client user is null or undefined');
        return;
    }

    postStats();
  }, 1000 * 60 * 60 * 24);
};
