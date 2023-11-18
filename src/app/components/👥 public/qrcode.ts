import { EmbedBuilder, Message } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import { logWithLabel } from '../../../utils/console';

module.exports = {
  name: 'qrcode',
  description: 'Create a QR code',
  aliases: ['qr-code'],
  category: 'public',
  examples: ['qrcode generate Hello', 'qrcode recode'],
  subcommands: ['qrcode generate <text>', 'qrcode recode'],
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const subcommand = args[0];
    switch (subcommand) {
      case 'generate':
        {
          const argsresult = encodeURIComponent(args.slice(1).join(' '));
          if (!argsresult)
            return message.channel.send({
              content: [
                `${emojis.error} You must enter a text to create a QR code!`,
                `Example: \`${prefix}qrcode <text>\``,
              ].join('\n'),
            });

          const url = `http://api.qrserver.com/v1/create-qr-code/?data=${argsresult}`;
          const embed = new EmbedBuilder()
            .setTitle('QR Code - Click here to download')
            .setURL(`${url}&margin=30`)
            .setFields(
              { name: 'Text', value: `\`\`\`${argsresult}\`\`\``, inline: true },
              { name: 'Download', value: `[Click here](${url}&margin=30)`, inline: true }
            )
            .setThumbnail(`${url}&size=1000x1000&margin=30`)
            .setColor('Green')
            .setTimestamp(new Date())
            .setFooter({
              text: message.author.tag,
              iconURL: message.author.displayAvatarURL({ forceStatic: true }),
            });

          message.channel.send({ embeds: [embed] }).catch(() => {
            logWithLabel('error', 'An error occurred while creating the QR code!');
            message.channel.send({
              content: [
                `${emojis.error} An error occurred while creating the QR code!`,
                `Example: \`${prefix}qrcode <text>\``,
              ].join('\n'),
            });
          });
        }
        break;
      case 'recode':
        {
          if (message.attachments.size === 0)
            return message.channel.send({
              content: [
                `${emojis.error} You must attach a QR code image to recode!`,
                `Example: \`${prefix}qrcode recode\``,
              ].join('\n'),
            });

          const attachment_URL = message.attachments.first()?.url;
          if (!attachment_URL)
            return message.channel.send({
              content: [
                `${emojis.error} The attached file is not a valid QR code image!`,
                `Example: \`${prefix}qrcode recode\``,
              ].join('\n'),
            });

          const encoded_URL = encodeURIComponent(attachment_URL);
          const QR_URL = `https://api.qrserver.com/v1/read-qr-code/?fileurl=${encoded_URL}&outputformat=json`;

          await fetch(QR_URL)
            .then((response) => response.json())
            .then((json) => {
              if (json[0].symbol[0].data === null)
                return message.reply({
                  content: [
                    `${emojis.error} The attached file is not a valid QR code image!`,
                    `Example: \`${prefix}qrcode recode\``,
                  ].join('\n'),
                });

              if (json[0].symbol[0].data.length >= 1024)
                return message.reply({
                  content: [
                    `${emojis.error} The text of the QR code is too long to send in a message!`,
                    `Example: \`${prefix}qrcode recode\``,
                  ].join('\n'),
                });

              const QRDecodeEmbed = new EmbedBuilder()
                .addFields({
                  name: '**Results:**',
                  value: `${json[0].symbol[0].data}`,
                })
                .setColor('#7289DA')
                .setThumbnail(attachment_URL)
                .setTimestamp()
                .setFooter({
                  text: message.author.tag,
                  iconURL: message.author.displayAvatarURL({ forceStatic: true }),
                });

              message.channel.send({ embeds: [QRDecodeEmbed] }).catch(() => {
                logWithLabel('error', 'An error occurred while decoding the QR code!');
                message.channel.send({
                  content: [
                    `${emojis.error} An error occurred while decoding the QR code!`,
                    `Example: \`${prefix}qrcode recode\``,
                  ].join('\n'),
                });
              });
            });
        }
        break;
    }
  },
};
