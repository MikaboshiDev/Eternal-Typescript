import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';
import model from '../../../models/guild';
export default new Command(
  new SlashCommandBuilder()
    .setName('log')
    .setNameLocalizations({
      fr: 'loggers',
      'en-US': 'loggers',
    })
    .setDescription('⚔️ Configura los logs del servidor.')
    .setDescriptionLocalizations({
      fr: '⚔️ Configure les journaux du serveur.',
      'en-US': '⚔️ Configure the server logs.',
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('set')
        .setNameLocalizations({
          fr: 'set',
          'en-US': 'set',
        })
        .setDescription('⚔️ Configura los logs del servidor a tu gusto.')
        .setDescriptionLocalizations({
          fr: '⚔️ Configure les journaux du serveur à votre guise.',
          'en-US': '⚔️ Configure the server logs to your liking.',
        })
        .addChannelOption((option) =>
          option
            .setName('canal')
            .setNameLocalizations({
              fr: 'canal',
              'en-US': 'channel',
            })
            .setDescription('El canal donde se enviaran los logs.')
            .setDescriptionLocalizations({
              fr: 'Le canal où les journaux seront envoyés.',
              'en-US': 'The channel where the logs will be sent.',
            })
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('info')
        .setNameLocalizations({
          fr: 'info',
          'en-US': 'info',
        })
        .setDescription('⚔️ Muestra la informacion de los logs del servidor.')
        .setDescriptionLocalizations({
          fr: '⚔️ Affiche les informations sur les journaux du serveur.',
          'en-US': '⚔️ Displays information about the server logs.',
        })
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('remove')
        .setNameLocalizations({
          fr: 'supprimer',
          'en-US': 'remove',
        })
        .setDescription('⚔️ Elimina los logs del servidor.')
        .setDescriptionLocalizations({
          fr: '⚔️ Supprime les journaux du serveur.',
          'en-US': '⚔️ Delete the server logs.',
        })
    ),
  async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    if (!interaction.guild) return;

    switch (subcommand) {
      case 'set':
        {
          const canal = interaction.options.getChannel('canal');
          if (!canal)
            return interaction.reply({
              content: [
                `${emojis.error} You must enter a channel to configure the logs.`,
                `example: \`/admin log set #logs\``,
              ].join('\n'),
              ephemeral: true,
            });

          const data = await model.findOne({ guildId: interaction.guild.id });
          if (!data)
            return interaction.reply({
              content: [
                `${emojis.error} You must configure the server before configuring the logs.`,
                `example: \`/admin config\``,
              ].join('\n'),
              ephemeral: true,
            });

          if (data?.channels?.log?.channel !== null)
            return interaction.reply({
              content: [`${emojis.error} The logs have already been configured.`, `example: \`/admin log info\``].join(
                '\n'
              ),
              ephemeral: true,
            });

          await model.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              $set: {
                'channels.log.channel': canal.id,
              },
            }
          );

          const response = new EmbedBuilder()
            .setAuthor({
              name: 'Configured Logs',
              iconURL: client.user?.displayAvatarURL({ forceStatic: true }),
            })
            .setDescription(`Logs have been set to ${canal} use \`/ admin panel\` to check at any time.`)
            .setColor('Random')
            .setTimestamp();
          interaction.reply({ embeds: [response], ephemeral: true });
        }
        break;
      case 'info':
        {
          const data = await model.findOne({ guildId: interaction.guild.id });
          if (!data) return;

          const datas = new EmbedBuilder()
            .setTitle('Data Server Logs')
            .setDescription(
              `Logs have been set to <#${data.channels?.log?.channel}> use \`/admin panel\` to check at any time.`
            )
            .addFields(
              {
                name: `Channel`,
                value: `> <#${data.channels?.log?.channel}> (\`${data.channels?.log?.channel}\`)`,
                inline: true,
              },
              { name: `Server ID`, value: `> \`${interaction.guild.id}\``, inline: true }
            )
            .setFooter({
              text: 'Discord server log system',
              iconURL: client.user?.displayAvatarURL({ forceStatic: true }),
            })
            .setColor('Random')
            .setTimestamp();

          interaction.reply({ embeds: [datas], ephemeral: true });
        }
        break;
      case 'remove':
        {
          const data = await model.findOne({ guildId: interaction.guild.id });
          if (data?.channels?.log?.channel === null)
            return interaction.reply({
              content: [
                `${emojis.error} The logs have not been configured yet.`,
                `example: \`/admin log set #logs\``,
              ].join('\n'),
              ephemeral: true,
            });

          await model.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              $set: {
                'channels.log.channel': null,
              },
            }
          );

          const response = new EmbedBuilder()
            .setTitle('Deleted Logs')
            .setColor('Random')
            .setDescription('Logs have been successfully removed from the discord server have a nice afternoon.')
            .setTimestamp();

          interaction.reply({ embeds: [response], ephemeral: true });
        }
        break;
    }
  }
);
