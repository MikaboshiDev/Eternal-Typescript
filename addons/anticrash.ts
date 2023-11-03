import { EmbedBuilder, WebhookClient } from 'discord.js';
import { inspect } from 'util';
import fs from 'node:fs';

const webhook = new WebhookClient({ url: process.env.webhook_faild! });
function handleError(title: string | null, url: string | null, ...fields: { name: any; value: string }[]) {
  const embed = new EmbedBuilder()
    .setColor('Red')
    .setTimestamp()
    .setFooter({ text: `System Anticrash Neko - Manager 2023` })
    .setTitle(title)
    .setURL(url)
    .addFields(...fields);

  webhook.send({ embeds: [embed] });
}

function createField(name: string, value: unknown) {
  return { name, value: `\`\`\`js\n${inspect(value, { depth: 0 }).slice(0, 300)}\`\`\`` };
}

module.exports = (client: { on: (arg0: string, arg1: (err: any) => void) => void }) => {
  client.on('error', (err) => {
    handleError(
      'Discord API Error',
      'https://discordjs.guide/popular-topics/errors.html#api-errors',
      createField('Error', err)
    );
  });

  process.on('unhandledRejection', (reason, promise) => {
    handleError(
      'Unhandled Rejection/Catch',
      'https://nodejs.org/api/process.html#event-unhandledrejection',
      createField('Reason', reason),
      createField('Promise', promise)
    );
  });

  function handleUncaughtException(event: string | null, err: unknown, origin: unknown) {
    handleError(
      event,
      'https://nodejs.org/api/process.html#event-uncaughtexception',
      createField('Error', err),
      createField('Origin', origin)
    );
  }

  process.on('uncaughtException', (err, origin) => handleUncaughtException('Uncaught Exception/Catch', err, origin));
  process.on('uncaughtExceptionMonitor', (err, origin) =>
    handleUncaughtException('Uncaught Exception Monitor', err, origin)
  );

  process.on('warning', (warn) => {
    handleError(
      'Uncaught Exception Monitor Warning',
      'https://nodejs.org/api/process.html#event-warning',
      createField('Warning', warn)
    );
  });
};
