import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/check';
import guild from '../../../models/guild';

module.exports = {
  id: 'captcha-model',
  async execute(interaction: any, client: any) {
    const valid = interaction.fields.getTextInputValue('captcha-txt');
    const UsersCode = await model.findOne({ Id: interaction.member.id });
    if (!UsersCode)
      return interaction.reply({
        content: [
          `${emojis.error} **${interaction.member.user.username}**, you don't have a captcha code to verify!`,
          `please try again later`,
        ].join('\n'),
      });

    const dataRole = await guild.findOne({ id: interaction.guild.id });
    if (!dataRole)
      return interaction.reply({
        content: [
          `${emojis.error} **${interaction.member.user.username}**, the server does not have a role to assign!`,
          `please try again later`,
        ].join('\n'),
      });

    if (dataRole.roleMember == null) return interaction.reply({
        content: [
            `${emojis.error} **${interaction.member.user.username}**, the server does not have a role to assign!`,
            `please try again later`,
        ].join('\n'),
    }); 
    
    const UserID = UsersCode.Id ? (UsersCode.Id as string) : null;
    if (UserID !== interaction.member.id)
      return interaction.reply({
        content: [
          `${emojis.error} **${interaction.member.user.username}**, you don't have a captcha code to verify!`,
          `please try again later`,
        ].join('\n'),
      });

    if (UsersCode.Code !== valid)
      return interaction.reply({
        embeds: [new EmbedBuilder().setColor('Red').setDescription(`${emojis.error} Invalid Captcha code: ${valid}`)],
        ephemeral: true,
      });
    else {
      await model.findOneAndUpdate(
        { Id: interaction.member.id },
        {
          Code: `verified`,
        },
        {
          new: true,
          upsert: true,
        }
      );
      await interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setColor('Green')
              .setFooter({ text: 'Private Server Control Systems', iconURL: client.user.avatarURL() })
              .setDescription(`${emojis.correct} **${interaction.member.user.username}**, you have been verified!`),
          ],
          ephemeral: true,
        })
        .then(() => {
          interaction.member.roles.add(dataRole.roleMember);
        });
    }
  },
};
