import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageComponentInteraction } from 'discord.js';
import emojis from '../../../config/json/emojis.json';
export async function pagination(
  client: any,
  message: any,
  texto: string[],
  titulo = 'Paginación',
  elementos_por_pagina = 5
) {
  const embeds: any[] = [];
  let elementos_por_pagina_actual = elementos_por_pagina;

  for (let i = 0; i < texto.length; i += elementos_por_pagina) {
    const desc = texto.slice(i, elementos_por_pagina_actual);
    elementos_por_pagina_actual += elementos_por_pagina;

    const embed = new EmbedBuilder()
      .setTitle(titulo.toString())
      .setDescription(desc.join(' '))
      .setColor(client.color)
      .setThumbnail(message.guild.iconURL({ forceStatic: true }));
    embeds.push(embed);
  }

  let paginaActual = 0;

  if (embeds.length === 1) return message.reply({ embeds: [embeds[0]] }).catch(() => {});

  const boton_atras = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId('Atrás').setLabel('Back');
  const boton_inicio = new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId('Inicio').setLabel('Home');
  const boton_avanzar = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId('Avanzar').setLabel('Forward');

  const embedpaginas = await message.reply({
    content: `**Click on the __Buttons__ to change pages according to your interest**`,
    embeds: [embeds[0]],
    components: [new ActionRowBuilder().addComponents([boton_atras, boton_inicio, boton_avanzar])],
  });

  const collector = embedpaginas.createMessageComponentCollector({
    filter: (i: MessageComponentInteraction) =>
      i.isButton() && i.user && i.user.id == message.author.id && i.message.author.id == client.user.id,
    time: 180e3,
  });

  collector.on('collect', async (b: any) => {
    if (b.user.id !== message.author.id)
      return b.reply({
        content: [
          `${emojis.error} **You are not allowed to use this button because you did not execute the command**`,
          `**Only** <@${message.author.id}> **can use it**`,
        ].join('\n'),
      });

    switch (b.customId) {
      case 'Atrás':
        {
          collector.resetTimer();

          if (paginaActual !== 0) {
            paginaActual -= 1;

            await embedpaginas
              .edit({
                embeds: [embeds[paginaActual]],
                components: [embedpaginas.components[0]],
              })
              .catch(() => {});
            await b.deferUpdate();
          } else {
            paginaActual = embeds.length - 1;

            await embedpaginas
              .edit({
                embeds: [embeds[paginaActual]],
                components: [embedpaginas.components[0]],
              })
              .catch(() => {});
            await b.deferUpdate();
          }
        }
        break;

      case 'Inicio':
        {
          collector.resetTimer();

          paginaActual = 0;
          await embedpaginas
            .edit({
              embeds: [embeds[paginaActual]],
              components: [embedpaginas.components[0]],
            })
            .catch(() => {});
          await b.deferUpdate();
        }
        break;

      case 'Avanzar':
        {
          collector.resetTimer();

          if (paginaActual < embeds.length - 1) {
            paginaActual++;

            await embedpaginas
              .edit({
                embeds: [embeds[paginaActual]],
                components: [embedpaginas.components[0]],
              })
              .catch(() => {});
            await b.deferUpdate();
          } else {
            paginaActual = 0;

            await embedpaginas
              .edit({
                embeds: [embeds[paginaActual]],
                components: [embedpaginas.components[0]],
              })
              .catch(() => {});
            await b.deferUpdate();
          }
        }
        break;

      default:
        break;
    }
  });

  collector.on('end', () => {
    embedpaginas.components[0].components.map((boton: { setDisabled: (arg0: boolean) => any }) =>
      boton.setDisabled(true)
    );
    embedpaginas
      .edit({
        content: `${emojis.error} Oops your time has expired come back later and execute the command again`,
        embeds: [embeds[paginaActual]],
        components: [embedpaginas.components[0]],
      })
      .catch(() => {});
  });
}
