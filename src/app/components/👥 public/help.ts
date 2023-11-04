import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Message,
  StringSelectMenuBuilder,
} from 'discord.js';
import { readdirSync } from 'fs';
import emojis from '../../../../config/emojis.json';
import packages from '../../../../package.json';
module.exports = {
  name: 'help',
  description: 'Help command for discord api, database and transparency',
  aliases: ['h', 'ayuda', 'helps'],
  category: 'public',
  cooldown: 1000,
  premium: false,
  examples: [`help [command]`, `help [category]`],
  async execute(client: any, message: Message, args: string[], prefix: any) {
    const categorias = readdirSync('./src/app/components');
    if (args[0]) {
      const comando =
        client.precommands.get(args[0].toLowerCase()) ||
        client.precommands.find((c: any) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
      const categoria = categorias.find((categoria) => categoria.toLowerCase().endsWith(args[0].toLowerCase()));
      if (comando) {
        let embed = new EmbedBuilder()
          .setAuthor({
            name: `Command Information: ${comando.name}`,
            iconURL: client.user.displayAvatarURL(),
          })
          .setFooter({
            text: `Version: ${packages.version} | Author: ${packages.author}`,
            iconURL: message.guild?.iconURL({ forceStatic: true }) as any,
          })
          .setThumbnail(message.guild?.iconURL({ forceStatic: true }) as any)
          .setColor('Green');

        if (comando.description) embed.setDescription(`> ${comando.description}`);
        if (comando.category) embed.addFields([{ name: `Category`, value: `> \`${comando.category}\``, inline: true }]);
        if (comando.cooldown)
          embed.addFields([
            { name: `Cooldown`, value: `> \`${comando.cooldown ? comando.cooldown : 3}s\``, inline: true },
          ]);
        if (comando.premium) embed.addFields([{ name: `Premium`, value: `> \`${comando.premium}\``, inline: true }]);
        if (comando.subcommands)
          embed.addFields([
            {
              name: `List in subcommands`,
              value: `${comando.subcommands.map((subcommand: any) => `• \`${subcommand}\``).join('\n')}`,
            },
          ]);
        if (comando.usage)
          embed.addFields([
            {
              name: `Usage`,
              value: `\`${prefix}${comando.usage}\``,
            },
          ]);
        if (comando.examples)
          embed.addFields([
            {
              name: `Examples`,
              value: `${comando.examples.map((ejemplo: any) => `\`${prefix}${ejemplo}\``).join('\n')}`,
            },
          ]);
        if (comando.aliases && comando.aliases.length >= 1)
          embed.addFields([
            {
              name: `Aliases`,
              value: `${comando.aliases.map((alias: any) => `${alias}`).join(', ')}`,
            },
          ]);
        if (comando.permissions && comando.permissions.length >= 1)
          embed.addFields([
            {
              name: `Permissions`,
              value: `${comando.permissions
                .map((permission: any) => {
                  return `No.${comando.permissions.indexOf(permission) + 1} - \`${permission}\``;
                })
                .join('\n')}`,
              inline: true,
            },
          ]);

        if (comando.botpermissions && comando.botpermissions.length >= 1)
          embed.addFields([
            {
              name: `Bot Permissions`,
              value: `${comando.botpermissions
                .map((permission: any) => {
                  return `No.${comando.botpermissions.indexOf(permission) + 1} - \`${permission}\``;
                })
                .join('\n')}`,
              inline: true,
            },
          ]);

        return message.reply({ embeds: [embed] }).catch((e) => {
          return message.reply({
            content: [
              `${emojis.error} An error occurred while trying to send the command information!`,
              `**Error:** \`${e.message}\``,
            ].join('\n'),
          });
        });
      } else if (categoria) {
        const comandos_de_categoria = readdirSync(`./src/app/components/${categoria}`).filter((archivo) =>
          archivo.endsWith('.ts')
        );
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`${categoria.split(' ')[0]} ${categoria.split(' ')[1]} ${categoria.split(' ')[0]}`)
              .setColor('Random')
              .setDescription(
                comandos_de_categoria.length >= 1
                  ? `>>> *${comandos_de_categoria.map((comando) => `\`${comando.replace(/.ts/, '')}\``).join(' - ')}*`
                  : `>>> *There are no commands in this category yet!...*`
              ),
          ],
        });
      } else {
        return message.reply({
          content: [
            `${emojis.error} **The specified command could not be found!**`,
            `Use \`${prefix}help\` to view the commands and categories!`,
          ].join('\n'),
        });
      }
    } else {
      var paginaActual = 0;

      let ayuda_embed = new EmbedBuilder()
        .setAuthor({ name: `Night Support Commands`, iconURL: client.user.displayAvatarURL() })
        .setFooter({
          text: `Version: ${packages.version} | Author: ${packages.author}`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          [
            `You have \`${categorias.length}\` categories and \`${client.precommands.size}\` commands to explore!`,
            `List of Available Commands: \`${prefix}help [category]\``,
            `Commands in More Detail: \`${prefix}help [command]\``,
          ].join('\n')
        )
        .addFields(
          {
            name: `HELLO AGAIN.`,
            value: [
              `Hello 👏 **${message.author.username}**, my name is __${client.user.username}__`,
              `I am a __MULTIFUNCTIONAL__ bot with a wide range of \`systems\` and several private \`features\``,
            ].join('\n'),
          },
          {
            name: '__CATEGORIES__',
            value: [
              `${emojis.store} **Store**`,
              `${emojis.ranking} **Manager**`,
              `${emojis.ice} **Configuration**`,
              `${emojis.fire} **Controls**`,
            ].join('\n'),
            inline: true,
          },
          {
            name: '__STATISTICS__',
            value: [
              `${emojis.folders} **${client.precommands.size}** Commands`,
              `${emojis.settings}  **0** Shards`,
              `${emojis.music} **${client.ws.ping}ms** Ping`,
              `${emojis.moderation} **${client.users.cache.size}** Users`,
            ].join('\n'),
            inline: true,
          },
          {
            name: '__INFORMATION__',
            value: [
              `We are a server dedicated to \`programming\` and development.`,
              `If you want to join our support server, you can do so with the following link: [Click Here](https://discord.gg/pgDje8S3Ed)`,
            ].join('\n'),
          }
        )
        .setThumbnail(message.guild?.iconURL({ forceStatic: true }) as any)
        .setColor('Random')
        .setTimestamp();

      let embeds_pages = [ayuda_embed];
      categorias.map((categoria, index) => {
        const comandos_de_categoria = readdirSync(`./src/app/components/${categoria}`).filter((archivo) =>
          archivo.endsWith('.ts')
        );

        let embed = new EmbedBuilder()
          .setTitle(`${categoria.split(' ')[0]} ${categoria.split(' ')[1]} ${categoria.split(' ')[0]}`)
          .setColor('Random')
          .setThumbnail(message.guild?.iconURL({ forceStatic: true }) as any)
          .setDescription(
            comandos_de_categoria.length >= 1
              ? `>>> *${comandos_de_categoria.map((comando) => `\`${comando.replace(/.ts/, '')}\``).join(' - ')}*`
              : `>>> ${emojis.error} *There are no commands in this category yet...*`
          )
          .setFooter({
            text: `Páge ${index + 2} / ${categorias.length + 1}\n Version: ${packages.version} | Author: ${
              packages.author
            }`,
            iconURL: message.guild?.iconURL({ forceStatic: true }) as any,
          });
        embeds_pages.push(embed);
      });

      const seleccion = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`SelecciónMenuAyuda`)
          .setMinValues(1)
          .addOptions(
            categorias.map((categoria) => {
              let objeto = {
                label: categoria.split(' ')[1].substring(0, 50),
                value: categoria,
                description: `Look at the commands in the section ${categoria.split(' ')[1].substring(0, 50)}`,
                emoji: categoria.split(' ')[0],
              };
              return objeto;
            })
          )
      );

      const botones = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setStyle(ButtonStyle.Success)
          .setEmoji(emojis.help.back)
          .setLabel('Back')
          .setCustomId('Atrás'),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setLabel('Home')
          .setEmoji(emojis.help.home)
          .setCustomId('Inicio'),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Success)
          .setLabel('Forward')
          .setEmoji(emojis.help.forward)
          .setCustomId('Avanzar'),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel('Soport')
          .setEmoji(emojis.help.support)
          .setURL('https://discord.gg/pgDje8S3Ed'),
      ]);

      let mensaje_ayuda = await message
        .reply({
          embeds: [ayuda_embed],
          components: [seleccion as any, botones],
        })
        .catch((e) => {
          console.log(e);
          return message.reply({
            content: [
              `${emojis.error} An error occurred while sending the help menu to your DMs!`,
              `**Solution:** Make sure you have DMs enabled and try again!`,
            ].join('\n'),
          });
        });

      const collector = mensaje_ayuda.createMessageComponentCollector({
        filter: (i) => i.isButton() || (i.isStringSelectMenu() && i.user && i.message.author.id == client.user.id),
        time: 180e3,
      });

      collector.on('collect', async (interaction) => {
        if (interaction.isButton()) {
          if (interaction.user.id !== message.author.id) {
            await interaction.reply({
              content: `${emojis.error} **You can not do that! Only ${message.author}** you can interact with the help menu`,
              ephemeral: true,
            });
          }

          switch (interaction.customId) {
            case 'Atrás':
              {
                collector.resetTimer();
                if (paginaActual !== 0) {
                  paginaActual -= 1;
                  await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => {});
                  await interaction?.deferUpdate();
                } else {
                  paginaActual = embeds_pages.length - 1;
                  await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => {});
                  await interaction?.deferUpdate();
                }
              }
              break;
            case 'Inicio':
              {
                collector.resetTimer();
                paginaActual = 0;
                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => {});
                await interaction?.deferUpdate();
              }
              break;

            case 'Avanzar':
              {
                collector.resetTimer();
                if (paginaActual < embeds_pages.length - 1) {
                  paginaActual++;
                  await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => {});
                  await interaction?.deferUpdate();
                } else {
                  paginaActual = 0;
                  await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => {});
                  await interaction?.deferUpdate();
                }
              }
              break;

            default:
              break;
          }
        } else {
          let embeds = [];
          for (const seleccionado of interaction.values) {
            const comandos_de_categoria = readdirSync(`./src/app/components/${seleccionado}`).filter((archivo) =>
              archivo.endsWith('.ts')
            );
            let embed = new EmbedBuilder()
              .setTitle(`${seleccionado.split(' ')[0]} ${seleccionado.split(' ')[1]} ${seleccionado.split(' ')[0]}`)
              .setColor('Random')
              .setThumbnail(message.guild?.iconURL({ forceStatic: true }) as any)
              .setDescription(
                comandos_de_categoria.length >= 1
                  ? `>>> *${comandos_de_categoria.map((comando) => `\`${comando.replace(/.ts/, '')}\``).join(' - ')}*`
                  : `>>> ${emojis.error} *There are no commands in this category yet, come back later*`
              )
              .setFooter({
                text: `Version: ${packages.version} | Author: ${packages.author}`,
                iconURL: message.guild?.iconURL({ forceStatic: true }) as any,
              });

            embeds.push(embed);
          }
          interaction.reply({ embeds, ephemeral: true }).catch(() => {
            return message.reply({
              content: [
                `${emojis.error} An error occurred while sending the help menu to your DMs!`,
                `**Solution:** Make sure you have DMs enabled and try again!`,
              ].join('\n'),
            });
          });
        }
      });

      collector.on('end', () => {
        mensaje_ayuda
          .edit({
            content: `${emojis.error} Oops your time has expired! Type \`help\` again to see it again!`,
            components: [],
          })
          .catch(() => {
            return message.reply({
              content: [
                `${emojis.error} An error occurred while sending the help menu to your DMs!`,
                `**Solution:** Make sure you have DMs enabled and try again!`,
              ].join('\n'),
            });
          });
      });
    }
  },
};
