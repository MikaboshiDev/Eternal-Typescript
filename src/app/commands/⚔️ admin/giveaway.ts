import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from 'discord.js';
import ms from 'ms';
import emojis from '../../../../config/json/emojis.json';
import { Command } from '../../../structure/builders';
import { logWithLabel } from '../../../utils/console';

export default new Command(
  new SlashCommandBuilder()
    .setName('giveaways')
    .setDescription('⚔️ Start a giveaway')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options
        .setName('start')
        .setDescription('⚔️ Start a giveaway')
        .addStringOption((options) =>
          options.setName('duration').setDescription('⚔️ Pass a duration (1m, 1h, 1d)').setRequired(true)
        )
        .addIntegerOption((options) =>
          options.setName('winners').setDescription('⚔️ Set the winners for this giveaway').setRequired(true)
        )
        .addStringOption((options) =>
          options.setName('prize').setDescription('⚔️ Set a prize to win').setRequired(true)
        )
        .addChannelOption((options) =>
          options
            .setName('channel')
            .setDescription('⚔️ Set the channel where the giveaway is started.')
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((options) =>
      options
        .setName('actions')
        .setDescription('⚔️ Giveaway options')
        .addStringOption((options) =>
          options
            .setName('options')
            .setDescription('⚔️ Select one of the options')
            .addChoices(
              { name: 'end', value: 'end' },
              { name: 'pause', value: 'pause' },
              { name: 'resume', value: 'unpause' },
              { name: 'reroll', value: 'reroll' },
              { name: 'delete', value: 'delete' }
            )
            .setRequired(true)
        )
        .addStringOption((options) =>
          options.setName('message_id').setDescription('⚔️ Set the giveaway message ID').setRequired(true)
        )
    ),
  async (client, interaction) => {
    const { options } = interaction;
    const Sub = options.getSubcommand();

    const errorEmbed = new EmbedBuilder().setColor('Red');

    const successEmbed = new EmbedBuilder().setColor('#38ca08');

    switch (Sub) {
      case 'start':
        {
          const gchannel = options.getChannel('channel') || interaction.channel;
          const duration = options.getString('duration');
          const winnerCount = options.getInteger('winners');
          const prize = options.getString('prize');

          (gchannel as TextChannel)?.send('@everyone').then((msg) => msg.delete());
          client.giveawaysManager
            .start(gchannel, {
              duration: ms(duration ?? ''),
              winnerCount,
              prize,
            })
            .then(async () => {
              successEmbed.setDescription(`Giveaway started in ${gchannel}`);
              return interaction.reply({
                embeds: [successEmbed],
                ephemeral: true,
              });
            })
            .catch((err: any) => {
              errorEmbed.setDescription(`Error \n\`${err}\``);
              return interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true,
              });
            });
        }
        break;
      case 'actions':
        {
          const choice = options.getString('options');
          const messageid = options.getString('message_id');
          const giveaway = client.giveawaysManager.giveaways.find(
            (g: any) => g.guildId === interaction.guildId && g.messageId === messageid
          );

          if (!giveaway) {
            errorEmbed.setDescription(`${emojis.error} The giveaway with message ID ${messageid} could not be found.`);
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          }
          switch (choice) {
            case 'end':
              {
                client.giveawaysManager
                  .end(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway ended.');
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
            case 'pause':
              {
                client.giveawaysManager
                  .pause(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway paused.');
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
            case 'resume':
              {
                client.giveawaysManager
                  .unpause(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway resumed.');
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
            case 'reroll':
              {
                client.giveawaysManager
                  .reroll(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway rerolled.');
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
            case 'delete':
              {
                client.giveawaysManager
                  .delete(messageid)
                  .then(() => {
                    successEmbed.setDescription('Giveaway deleted.');
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err: any) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
          }
        }
        break;
      default: {
        logWithLabel('error', `Unknown subcommand ${Sub} in ${interaction.commandName}`);
        errorEmbed.setDescription(`${emojis.error} Unknown subcommand \`${Sub}\``);
      }
    }
  }
);
