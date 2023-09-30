import { EmbedBuilder, MessagePayload, WebhookClient, WebhookMessageEditOptions } from 'discord.js';
import fs from 'fs';
import { DateTime } from 'luxon';
import fetch from 'node-fetch';
import path from 'path';
import { logWithLabel } from '../src/utils/console';

const impactEmojis = {
  critical: '🔴',
  major: '🟠',
  minor: '🟡',
  resolved: '✅',
  postmortem: '📋',
};

const api = 'https://srhpyqt94yxb.statuspage.io/api/v2/incidents.json';
const registroArchivo = './config/registro_incidentes.json';

module.exports = (client: any) => {
  client.on('ready', () => {
    const webhook = new WebhookClient({ url: process.env.webhook_monitoring! });
    const enabled = process.env.enabled as unknown as boolean;

    if (enabled === false) return;
    async function embedFromIncident(incident: {
      impact: string | number;
      status: string;
      started_at: string | number | Date;
      shortlink: string | null;
      name: string | null;
      id: any;
      incident_updates: any[];
      components: any[];
    }) {
      const impactEmojis: { [key: string]: string } = {
        critical: '🔴',
        major: '🟠',
        minor: '🟡',
        resolved: '✅',
        postmortem: '📋',
      };

      const impactEmoji = impactEmojis[incident.impact] || '❔';

      const embed = new EmbedBuilder()
        .setColor(incident.status === 'resolved' || incident.status === 'postmortem' ? 'Green' : 'Red')
        .setTimestamp(new Date(incident.started_at))
        .setURL(incident.shortlink)
        .setTitle(incident.name)
        .setFooter({ text: `Incident ${incident.id} ${impactEmoji}`, iconURL: 'https://i.imgur.com/8DKwbhj.png' });

      for (const update of incident.incident_updates.reverse()) {
        const updateDT = DateTime.fromISO(update.created_at);
        const timeString = `<t:${Math.floor(updateDT.toSeconds())}:R>`;
        const authorName = update.author ? update.author.name : 'Unknown Author';

        embed.addFields({
          name: `${update.status.charAt(0).toUpperCase() + update.status.slice(1)} ${impactEmoji} (${timeString})`,
          value: update.body,
        });
      }

      const descriptionParts = [`• Impact: ${incident.impact}`];

      if (incident.components.length) {
        const affectedNames = incident.components.map((c) => c.name);
        descriptionParts.push(`• Affected Components: ${affectedNames.join(', ')}`);
      }

      embed.setDescription(descriptionParts.join('\n'));

      return embed;
    }

    async function updateIncident(
      incident: {
        id: any;
        impact?: string | number;
        status?: string;
        started_at?: string | number | Date;
        shortlink?: string | null;
        name?: string | null;
        incident_updates?: any[];
        components?: any[];
      },
      messageID: string | MessagePayload | WebhookMessageEditOptions | undefined
    ) {
      try {
        let embed = await embedFromIncident(incident as any);
        const message = await (messageID ? webhook.send({ embeds: [embed] }) : webhook.send({ embeds: [embed] }));
        logWithLabel('debug', `Updated incident ${incident.id} with message ${message.id}`);
      } catch (error) {
        if (messageID) {
          logWithLabel('discord', `Error during hook editing on incident ${incident.id}\n${error}`);
        } else {
          logWithLabel('discord', `Error during hook sending on incident ${incident.id}\n${error}`);
        }
      }
    }

    let incidentesEnviados = new Set();
    try {
      const registroPath = path.join(__dirname, registroArchivo);
      if (fs.existsSync(registroPath)) {
        const registroData = fs.readFileSync(registroPath, 'utf8');
        incidentesEnviados = new Set(JSON.parse(registroData));
      }
    } catch (error) {
      logWithLabel('error', `Failed to load incident log: ${error}`);
    }

    async function check() {
      logWithLabel('info', 'Checking for new incidents');
      try {
        const json = await fetch(api).then((r) => r.json());
        const { incidents } = json;
        for (const incident of incidents.reverse()) {
          if (!incidentesEnviados.has(incident.id)) {
            const data = await webhook.fetchMessage(incident.id).catch(() => null);
            if (!data) {
              logWithLabel('debug', `Incident ${incident.id} created`);
              await updateIncident(incident, undefined);
              incidentesEnviados.add(incident.id);
              guardarRegistroEnArchivo();
            } else {
              const incidentUpdate = DateTime.fromISO(incident.updated_at || incident.created_at);
              if (DateTime.fromISO((data as any).lastUpdate) < incidentUpdate) {
                logWithLabel('debug', `Incident ${incident.id} updated`);
                await updateIncident(incident, (data as any).messageID);
                incidentesEnviados.add(incident.id);
                guardarRegistroEnArchivo();
              }
            }
          }
        }
      } catch (error) {
        logWithLabel('discord', `Error during incident check\n${error}`);
      }
    }

    function guardarRegistroEnArchivo() {
      try {
        const registroPath = path.join(__dirname, registroArchivo);
        fs.writeFileSync(registroPath, JSON.stringify(Array.from(incidentesEnviados)));
      } catch (error) {
        logWithLabel('error', `Failed to load incident log: ${error}`);
      }
    }

    check();
    setInterval(check, 60_000 * 5);
  });
};
