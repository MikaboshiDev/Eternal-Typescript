import { ApplicationCommandType, ColorResolvable, ContextMenuCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../../../structure/builders';

export default new Command(
  new ContextMenuCommandBuilder().setName('getUserInfo').setType(ApplicationCommandType.User).setDMPermission(false),
  async (client, interaction: any) => {
    const target = await interaction.guild.members.fetch(interaction.targetId);
    const user = await interaction.guild.members.fetch(target.id);

    const response = new EmbedBuilder()
      .setColor(<ColorResolvable>'Random')
      .setAuthor({
        name: target.user.tag,
        iconURL: target.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
      })
      .setThumbnail(target.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .addFields(
        { name: 'Member', value: `${target}`, inline: true },
        { name: 'Nickname', value: target.nickname || 'None', inline: true },
        { name: 'Bot Account', value: `${user.bot ? 'True' : 'False'}` },
        { name: 'Roles', value: `${target.roles.cache.map((r: any) => r).join(' ')}`, inline: false },
        { name: 'Joined Server', value: `<t:${Math.floor(target.joinedAt.getTime() / 1000)}:R>`, inline: true },
        { name: 'Joined Discord', value: `<t:${Math.floor(target.user.createdAt.getTime() / 1000)}:R>`, inline: true }
      )
      .setFooter({ text: `User ID: ${target.user.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [response], ephemeral: true });
  }
);
