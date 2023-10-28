import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../../class/builders';
import emojis from '../../../../config/emojis.json';
import { logWithLabel } from '../../../utils/console';

export default new Command(
  new SlashCommandBuilder()
    .setName('reload')
    .setDescription('👑 Restart or shut down the bot.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((subcommand) => subcommand.setName('application').setDescription('👑 Restart the bot application.'))
    .addSubcommand((subcommand) => subcommand.setName('commands').setDescription('👑 Reload only the bot commands.'))
    .addSubcommand((subcommand) => subcommand.setName('process').setDescription('👑 Shut down the bot completely.'))
    .setDMPermission(false),
  async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    try {
      switch (subcommand) {
        case 'application':
          {
            const button = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId('yes')
                .setLabel('Continue')
                .setStyle(ButtonStyle.Success)
                .setEmoji(emojis.correct)
            );

            const msg = await interaction.reply({
              content: [
                `${emojis.timer} Hi, I'm the manager of the bto, I'm sure you want to restart it completely along with the current cache.`,
                `Press the continue button if so or wait 30 seconds to cancel.`,
              ].join('\n'),
              components: [button as any],
              ephemeral: true,
            });

            const filter = (i: any) => i.user.id === interaction.user.id;
            const collector = interaction.channel?.createMessageComponentCollector({
              filter,
              time: 30000,
            });

            collector?.on('collect', async (i) => {
              if (i.customId === 'yes') {
                await interaction
                  .editReply({
                    content: `${emojis.counter} Restarting the bot...`,
                  })
                  .then(async () => {
                    setInterval(async () => {
                      logWithLabel('discord', 'Restarting the bot... (Reload)');
                      await interaction
                        .editReply({
                          content: `${emojis.correct} The bot has been restarted successfully.`,
                        })
                        .then(async () => {
                          await client.destroy();
                          await client.login(process.env.token!);
                        });
                    }, 5000);
                  });
              } else {
                await interaction.editReply({
                  content: `${emojis.error} The bot has not been restarted successfully because you canceled the operation.`,
                });
              }
            });
          }
          break;
        case 'commands':
          {
            const button = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId('yes')
                .setLabel('Continue')
                .setStyle(ButtonStyle.Success)
                .setEmoji(emojis.correct)
            );

            const msg = await interaction.reply({
              content: [
                `${emojis.timer} Hi, I'm the manager of the bto, I'm sure you want to restart only the commands.`,
                `Press the continue button if so or wait 30 seconds to cancel.`,
              ].join('\n'),
              components: [button as any],
              ephemeral: true,
            });

            const filter = (i: any) => i.user.id === interaction.user.id;
            const collector = interaction.channel?.createMessageComponentCollector({
              filter,
              time: 30000,
            });

            collector?.on('collect', async (i) => {
              if (i.customId === 'yes') {
                await interaction
                  .editReply({
                    content: `${emojis.counter} Restarting the commands...`,
                  })
                  .then(async () => {
                    setInterval(async () => {
                      logWithLabel('discord', 'Restarting the commands... (Reload)');
                      await interaction
                        .editReply({
                          content: `${emojis.correct} The commands have been restarted successfully.`,
                        })
                        .then(async () => {
                          await interaction.editReply({
                            content: `${emojis.correct} The commands have been restarted successfully.`,
                            components: [],
                          });
                          await client.application?.commands.set(client.commands.map((cmd) => cmd.structure));
                          logWithLabel('discord', 'Application commands deployed! (Reload)');
                        });
                    }, 5000);
                  });
              } else {
                await interaction.editReply({
                  content: `${emojis.error} The commands have not been restarted successfully because you canceled the operation.`,
                });
              }
            });
          }
          break;
        case 'process': {
          const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('yes')
              .setLabel('Continue')
              .setStyle(ButtonStyle.Success)
              .setEmoji(emojis.correct)
          );

          const msg = await interaction.reply({
            content: [
              `${emojis.timer} Hi, I'm the manager of the bto, I'm sure you want to shut down the bot completely.`,
              `Press the continue button if so or wait 30 seconds to cancel.`,
            ].join('\n'),
            components: [button as any],
            ephemeral: true,
          });

          const filter = (i: any) => i.user.id === interaction.user.id;
          const collector = interaction.channel?.createMessageComponentCollector({
            filter,
            time: 30000,
          });

          collector?.on('collect', async (i) => {
            if (i.customId === 'yes') {
              await interaction
                .editReply({
                  content: `${emojis.counter} Shutting down the bot...`,
                })
                .then(async () => {
                  setInterval(async () => {
                    logWithLabel('discord', 'Shutting down the bot... (Reload)');
                    await interaction
                      .editReply({
                        content: `${emojis.correct} The bot has been shut down successfully.`,
                        components: [],
                      })
                      .then(async () => {
                        await client.destroy();
                      });
                  }, 5000);
                });
            } else {
              await interaction.editReply({
                content: `${emojis.error} The bot has not been shut down successfully because you canceled the operation.`,
              });
            }
          });
        }
      }
    } catch (error) {
      logWithLabel('error', `${__filename} | ${error}`);
      await interaction.reply({
        content: `${emojis.error} An error occurred while executing this command.`,
        ephemeral: true,
      });
    }
  }
);
