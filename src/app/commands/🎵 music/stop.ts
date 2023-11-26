import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, TextChannel } from 'discord.js';
import { Command } from '../../../class/builders';
import tracks from '../../../models/servers/tracks';
import emojis from '../../../../config/json/emojis.json';

export default new Command(
  new SlashCommandBuilder().setName('stop').setDescription('🎵 Stops the current song or playlist'),
  async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild?.id);
    if (!player)
      return interaction.reply({
        content: [
          `${emojis.error} The queue is empty or there is no song playing right now`,
          `consider adding a song with the command \`play\``,
        ].join('\n'),
        ephemeral: true,
      });
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    if (!member?.voice?.channel) {
      return interaction.reply({
        content: `${emojis.error} You have to be on a voice channel for this command to work`,
        ephemeral: true,
      });
    } else if (
      interaction.guild!.members.me?.voice?.channel &&
      member.voice?.channel.id != interaction.guild!.members.me?.voice?.channel.id
    ) {
      return interaction.reply({
        content: `${emojis.error} You must be on the same voice channel as me for this command to work`,
        ephemeral: true,
      });
    }
    const end = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel('Finished song')
      .setCustomId('end')
      .setDisabled(true);
    const data = await tracks.findOne({ guildID: player.guildId });
    const guild = await client.guilds.cache.get(player.guildId);
    const channel = await guild?.channels.cache.get(player.textChannel);
    if (channel instanceof TextChannel) {
      const msg = await channel.messages.fetch(data?.messageID!);
      await msg.edit({ components: [new ActionRowBuilder<ButtonBuilder>().addComponents(end)] });
    }
    await player.destroy();
    return interaction.channel?.send({
      content: [
        `${emojis.correct} The queue has been stopped and the player has been destroyed`,
        `use the command \`play\` to start a new queue`,
      ].join('\n'),
    });
  }
);
