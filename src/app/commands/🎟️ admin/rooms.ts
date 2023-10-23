import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { logWithLabel } from '../../../utils/console';
import emojis from '../../../../config/emojis.json';
import { Command } from '../../../class/builders';

export default new Command(
  new SlashCommandBuilder()
    .setName('voz')
    .setNameLocalizations({
      fr: 'voix',
      'en-US': 'voice',
    })
    .setDescription('Controls your voice channel.')
    .setDMPermission(false)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('invite')
        .setDescription('Invite a member to your voice channel.')
        .addUserOption((option) => option.setName('member').setDescription('Select the member.').setRequired(true))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('disable')
        .setDescription('Disable your voice channel.')
        .addUserOption((option) => option.setName('member').setDescription('Select the member.').setRequired(true))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('name')
        .setDescription('Change the name of your voice channel.')
        .addStringOption((option) => option.setName('text').setDescription('Enter the new name.').setRequired(true))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('public')
        .setDescription('Change the privacy of your voice channel.')
        .addStringOption((option) =>
          option
            .setName('turn')
            .setDescription('Turn on or off the privacy.')
            .setRequired(true)
            .addChoices({ name: 'On', value: 'on' }, { name: 'Off', value: 'off' })
        )
    ),
  async (client, interaction: any) => {
    const { options, member, guild } = interaction;
    const subCommand = options.getSubcommand();
    const voiceChannel = member.voice.channel;
    const Embed = new EmbedBuilder().setColor('Green');
    const ownedChannel = client.voiceGenerator.get(member.user.id);

    if (!voiceChannel)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('Voice Systems! 🟡')
            .setDescription(`${emojis.error} You are not in a voice channel to use the commands.`)
            .setColor('Red'),
        ],
        ephemeral: true,
      });
    if (!ownedChannel || voiceChannel.id !== ownedChannel)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('Voice Systems! 🟡')
            .setDescription(`${emojis.error} You are not the owner of this or any other voice channel.`)
            .setColor('Red'),
        ],
        ephemeral: true,
      });

    switch (subCommand) {
      case 'name':
        {
          const newName = options.getString('text');
          if (newName.length > 22 || newName.length < 1)
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Voice Systems')
                  .setDescription(
                    [
                      `${emojis.error} The name cannot be more than 22 characters.`,
                      `this is to avoid spamming the channel name.`,
                    ].join('\n')
                  )
                  .setColor('Red'),
              ],
              ephemeral: true,
            });
          voiceChannel.edit({ name: newName });
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Voice Systems')
                .setDescription(
                  [
                    `${emojis.correct} The name of the channel has been changed to \`${newName}\`.`,
                    `Remember that you can only change the name once every 5 minutes.`,
                  ].join('\n')
                ),
            ],
            ephemeral: true,
          });
        }
        break;
      case 'invite':
        {
          const targetMember = options.getMember('member');
          voiceChannel.permissionOverwrites.edit(targetMember, { Connect: true });
          await targetMember
            .send({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Voice Systems')
                  .setDescription(
                    [
                      `${emojis.correct} ${member} has invited you to their voice channel.`,
                      `To join the channel, click on the button below.`,
                    ].join('\n')
                  ),
              ],
            })
            .catch(() => {});
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Voice Systems')
                .setDescription(
                  [
                    `${emojis.correct} ${targetMember} has been invited to your voice channel.`,
                    `Remember that you can only invite one person every 5 minutes.`,
                  ].join('\n')
                ),
            ],
          });
        }
        break;
      case 'disable':
        {
          const targetMember = options.getMember('member');
          voiceChannel.permissionOverwrites.edit(targetMember, { Connect: false });
          if (targetMember.voice.channel && targetMember.voice.channel.id == voiceChannel.id)
            targetMember.voice.setChannel(null);
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Voice Systems')
                .setDescription(
                  [
                    `${emojis.correct} ${targetMember} has been removed from your voice channel.`,
                    `Remember that you can only remove one person every 5 minutes.`,
                  ].join('\n')
                ),
            ],
            ephemeral: true,
          });
        }
        break;
      case 'public':
        {
          const turnChoice = options.getString('turn');
          switch (turnChoice) {
            case 'on':
              {
                voiceChannel.permissionOverwrites.edit(guild.id, { Connect: null });
                interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle('Voice Systems')
                      .setDescription(
                        [
                          `${emojis.correct} The channel is now open to the public.`,
                          `Remember that you can only open the channel to the public once every 5 minutes.`,
                        ].join('\n')
                      ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case 'off':
              {
                voiceChannel.permissionOverwrites.edit(guild.id, { Connect: false });
                interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle('Voice Systems')
                      .setDescription(
                        [
                          `${emojis.correct} The channel is now closed to the public.`,
                          `Remember that you can only close the channel to the public once every 5 minutes.`,
                        ].join('\n')
                      ),
                  ],
                  ephemeral: true,
                });
              }
              break;
          }
        }
        break;
    }
  }
);
