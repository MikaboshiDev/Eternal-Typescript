import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from 'discord.js';
import emojis from '../../../../config/json/emojis.json';
import guildDatas from '../../../models/counter/guild';
import { Command } from '../../../structure/builders';
export default new Command(
  new SlashCommandBuilder()
    .setName('numbers')
    .setDescription('⚔️ Numbers command for the counting channel (WIP)')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('setchannel')
        .setDescription('⚔️ Setup a counting channel.')
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('⚔️ Select a channel where you want setup.')
            .setRequired(false)
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('numonly')
        .setDescription('⚔️ Toggle count only channel!')
        .addStringOption((option) =>
          option
            .setName('enable')
            .setDescription('⚔️ Counting channel should count only or not!')
            .setRequired(true)
            .addChoices({ name: 'true', value: 'true' }, { name: 'false', value: 'false' })
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('disablemath')
        .setDescription('⚔️ Toggle math mood in counting channel!')
        .addStringOption((option) =>
          option
            .setName('disable')
            .setDescription('⚔️ Counting Bot')
            .setRequired(true)
            .addChoices({ name: 'true', value: 'true' }, { name: 'false', value: 'false' })
        )
    ),
  async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'disablemath':
        {
          const math = interaction.options.getString('disable');
          if (!math) return;

          const guildData = await guildDatas.findOne({ id: interaction.guild?.id });
          const embed = new EmbedBuilder()
            .setDescription(`✅ Successfully math has been set to ${math}`)
            .setColor('#2f3136')
            .setFooter({
              text: 'Requested by ' + interaction.user.username,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

          if (!guildData)
            return await interaction.reply({
              content: [
                `${emojis.error} **${interaction.user.username}**, this server doesn't have any data!`,
                `Please run this command again in 1-2 minutes!`,
              ].join('\n'),
              ephemeral: true,
            });
          else {
            guildData.math = math as any;
            guildData.save();
            await interaction.reply({ embeds: [embed], ephemeral: true });
          }
        }
        break;
      case 'numonly':
        {
          const option = interaction.options.getString('enable');

          const guildData = await guildDatas.findOne({ id: interaction.guild?.id });

          const countOnlyEmbed = new EmbedBuilder()
            .setTitle('✅ Counter Only Updated')
            .setDescription(`**Successfully counter only setting has been updated to -** \`${option}\``)
            .setColor('#2f3136')
            .setFooter({ text: 'Counter Bot - 2023' })
            .setTimestamp();

          if (!guildData)
            return await interaction.reply({
              content: `❌ Counting channel is not available in this guild. `,
              ephemeral: true,
            });
          else {
            guildData.numOnly = option as any;
            guildData.save();
            await interaction.reply({ embeds: [countOnlyEmbed], ephemeral: true });
          }
        }
        break;
      case 'setchannel':
        {
          const channel =
            interaction.options.getChannel('channel') || client.channels.cache.get(interaction.channel?.id as string);
          if (!channel || channel.type !== ChannelType.GuildText)
            return interaction.reply({
              content: [
                `${emojis.error} **${interaction.user.username}**, please select a channel!`,
                `Example: \`/numbers setchannel #channel\``,
              ].join('\n'),
              ephemeral: true,
            });

          const guildData = await guildDatas.findOne({ id: interaction.guild?.id });
          const embed = new EmbedBuilder().setColor('#2f3136');

          if (guildData && guildData.channelId == channel.id) {
            embed.setDescription(`❌ The counting channel has already setuped in <#${channel.id}>.`);
            return interaction.reply({ embeds: [embed] });
          }

          if (guildData && guildData.channelId == '0') {
            guildData.channelId = channel.id;
            guildData.name = interaction.guild?.name as string;
            guildData.save();
            embed.setDescription(`✅ The counting channel has been setuped in <#${channel.id}>.`);
          } else if (guildData && guildData.channelId !== '0') {
            guildData.channelId = channel.id;
            guildData.name = interaction.guild?.name as string;
            guildData.save();
            embed.setDescription(`✅ The counting channel has been moved to <#${channel.id}>.`);
          } else {
            guildDatas.create({
              id: interaction.guild?.id,
              name: interaction.guild?.name,
              channelId: channel.id,
            });
            embed.setDescription(`✅ The counting channel has been setuped in <#${channel.id}>.`);
          }

          await interaction.reply({ embeds: [embed] });
          await (channel as TextChannel).send({
            embeds: [
              new EmbedBuilder()
                .setDescription(`✅ The counting channel has been setuped in <#${channel.id}>.`)
                .setColor('#2f3136')
                .setFooter({
                  text: 'Requested by ' + interaction.user.username,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setTimestamp(),
            ],
          });
        }
        break;
    }
  }
);
