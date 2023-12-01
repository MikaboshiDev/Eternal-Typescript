import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../../../structure/builders';

export default new Command(
  new ContextMenuCommandBuilder().setName('getInvites').setType(ApplicationCommandType.User).setDMPermission(false),
  async (client, interaction: any) => {
    const { targetUser } = interaction;

    const user = targetUser;
    let invites = await interaction.guild.invites.fetch();
    let userInv = invites.filter((u: any) => u.inviter && u.inviter.id === user.id);

    let i = 0;
    userInv.forEach((inv: any) => (i += inv.uses));
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('User Invite Count')
      .setDescription(`${user.tag} has **${i}** invites.`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
);
