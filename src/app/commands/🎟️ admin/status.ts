import { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import model from '../../../models/systems/channelStatus';
import { logWithLabel } from '../../../utils/console';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';

export default new Command(
  new SlashCommandBuilder().setName('stats').setDescription('🎟️ Schedule voice channels for server states'),
  async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle('Status - Channel')
      .setDescription(
        [
          `${emojis.time} Select the channel you will set as the status channel`,
          `In case of problems, contact the creator's support`,
        ].join('\n')
      )
      .setTimestamp()
      .setThumbnail(client.user?.displayAvatarURL() || '')
      .setFooter({ text: 'Status - Channel', iconURL: client.user?.displayAvatarURL() });

    const menu = new ActionRowBuilder().addComponents(
      new ChannelSelectMenuBuilder()
        .setCustomId('status_channel')
        .setPlaceholder('Select a channel')
        .setMinValues(1)
        .setMaxValues(1)
        .setChannelTypes(ChannelType.GuildVoice)
    );

    const msg = await interaction.reply({ embeds: [embed], components: [menu as any] });
    const filter = (i: { user: { id: string } }) => i.user.id === interaction.user.id;
    const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 60000 });
    collector?.on('collect', async (i) => {
      if (i.isChannelSelectMenu()) {
        if (i.customId === 'status_channel') {
          const channel = i.values[0];
          const guild = i.guild;
          const data = await model.findOne({ guildId: guild?.id });
          if (!data) {
            msg
              .edit({
                embeds: [
                  new EmbedBuilder()
                    .setTitle('Status - Channel')
                    .setDescription(
                      [
                        `There is no server data inside the database try again later`,
                        `In case of problems, contact the creator's support`,
                      ].join('\n')
                    )
                    .setTimestamp()
                    .setThumbnail(client.user?.displayAvatarURL() || '')
                    .setFooter({ text: 'Status - Channel', iconURL: client.user?.displayAvatarURL() }),
                ],
                components: [],
              })
              .then(() => {
                const newData = new model({
                  guildId: guild?.id,
                });
                newData.save().catch((err) => logWithLabel('error', err));
                collector?.stop('time');
              });
          }

          await model.findOneAndUpdate(
            { guildId: guild?.id },
            {
              $push: {
                channelUser: channel,
              },
            }
          );
          msg.edit({
            embeds: [
              new EmbedBuilder()
                .setTitle('Status - Channel')
                .setDescription(`${emojis.correct} Channel set to <#${channel}>`)
                .setTimestamp()
                .setThumbnail(client.user?.displayAvatarURL() || '')
                .setFooter({ text: 'Status - Channel', iconURL: client.user?.displayAvatarURL() }),
            ],
            components: [],
          });
        }
      }
    });
    
    collector?.on('end', (collected, reason) => {
      if (reason === 'time') {
        msg.edit({
          embeds: [
            new EmbedBuilder()
              .setTitle('Status - Channel')
              .setDescription(`You took too long to respond`)
              .setTimestamp()
              .setThumbnail(client.user?.displayAvatarURL() || '')
              .setFooter({ text: 'Status - Channel', iconURL: client.user?.displayAvatarURL() }),
          ],
          components: [],
        });
      }
    });
  }
);
