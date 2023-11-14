import {
  AutoModerationActionType,
  AutoModerationRuleEventType,
  AutoModerationRuleTriggerType,
  EmbedBuilder,
  Message,
} from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { logWithLabel } from '../../../utils/console';
const Api_Url = 'https://discord.com/api/v10';

module.exports = {
  name: 'autospam',
  description: 'Spam a message in a channel every x seconds',
  aliases: ['spam'],
  category: 'owner',
  premium: false,
  cooldown: 20,
  owner: true,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[0]) || null;
    if (!channel)
      return message.channel.send({
        content: [
          `${emojis.error} You need to provide a channel for the rule you want to create in order to continue`,
          `Example: \`${prefix}autospam #general\``,
        ].join('\n'),
      });

    try {
      const automoderation = message.guild?.autoModerationRules
        .create({
          name: 'Spam Protection',
          eventType: AutoModerationRuleEventType.MessageSend,
          actions: [
            {
              type: AutoModerationActionType.SendAlertMessage,
              metadata: {
                channel: channel.id,
              },
            },
            {
              type: AutoModerationActionType.BlockMessage,
              metadata: {
                customMessage:
                  'The Spam Protection has been activated, please wait a few seconds before sending another message',
              },
            },
          ],
          triggerType: AutoModerationRuleTriggerType.Spam,
          enabled: true,
          reason: 'Spam Protection',
        })
        .then((rule) => {
          const embed = new EmbedBuilder()
            .setTitle('Spam Protection')
            .addFields(
              { name: 'Channel', value: `<#${channel.id}> (\`${channel.id}\`)`, inline: true },
              { name: 'Rule ID', value: `\`${rule.id}\``, inline: true },
              { name: 'Rule Name', value: `\`${rule.name}\``, inline: true },
              { name: 'Rule Type', value: `\`${rule.triggerType}\``, inline: true },
              { name: 'Rule Status', value: `\`${rule.enabled ? 'Enabled' : 'Disabled'}\``, inline: true }
            )
            .setTimestamp()
            .setFooter({
              text: `Rule ID: ${rule.id}`,
              iconURL: message.author.avatarURL() as string,
            });

          message.channel.send({ embeds: [embed] });
        });
    } catch (e) {
      logWithLabel('error', `Error executing command: ${e}`);
      console.error(e);
    }
  },
};
