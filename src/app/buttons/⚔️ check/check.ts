import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import emojis from '../../../../config/emojis.json';
import model from '../../../models/servers/check';
import { Captcha } from 'captcha-canvas';
import { GuildMember } from 'discord.js';
module.exports = {
  id: 'verify',
  async execute(interaction: ChatInputCommandInteraction, client: any) {
    const captcha = new Captcha();
    captcha.async = false;
    captcha.addDecoy();
    captcha.drawTrace();
    captcha.drawCaptcha();
    console.log(captcha.text);
    const attachment = new AttachmentBuilder(await captcha.png, { name: 'captcha.png' });
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('Captcha Code')
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/1063004547267690547/1063423421435879484/5044-clock-running.gif'
      )
      .setImage(`attachment://${attachment.name}`);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('captcha')
        .setEmoji('👥')
        .setLabel("I'm not a Robot")
        .setStyle(ButtonStyle.Secondary)
    );

    const UsersCode = await model.findOne({
      Id: (interaction.member as GuildMember).id,
    });

    if (UsersCode && UsersCode.Code === 'vedifed') {
      interaction.reply({
        content: [
            `${emojis.error} You are already verified!`,
            `If you want to verify another account, please contact the server staff.`,
        ].join('\n'),
        ephemeral: true,
      });
    } else if (!UsersCode) {
      await model.create({
        Id: (interaction.member as GuildMember).id,
        Code: `${captcha.text}`,
        stat: false,
      });
      await interaction.reply({
        embeds: [embed],
        components: [row as any],
        files: [attachment],
        ephemeral: true,
      });
    } else if (UsersCode.Code !== 'vedifed') {
      await model.findOneAndUpdate(
        { Id: (interaction.member as GuildMember).id },
        {
          Code: `${captcha.text}`,
          stat: false,
        },
        {
          new: true,
          upsert: true,
        }
      );
      await interaction.reply({
        embeds: [embed],
        components: [row as any],
        files: [attachment],
        ephemeral: true,
      });
    }
  },
};
