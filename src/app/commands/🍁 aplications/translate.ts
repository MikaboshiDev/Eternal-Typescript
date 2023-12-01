import translate from '@iamtraction/google-translate';
import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../../../structure/builders';

export default new Command(
  new ContextMenuCommandBuilder().setName('translate').setType(ApplicationCommandType.Message).setDMPermission(false),
  async (client, interaction: any) => {
    try {
      const { channel, targetId } = interaction;
      const query = await channel?.messages.fetch(targetId);
      const raw = query.content;

      const translated = await translate(query, { to: 'en' });
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Green')
            .setTitle(`Translated to English Language`)
            .addFields(
              {
                name: `Your text:`,
                value: `\`\`\`${raw}\`\`\``,
              },
              {
                name: `Translated text:`,
                value: `\`\`\`${translated.text}\`\`\``,
              }
            )
            .setFooter({
              text: `Requested by ${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL(true),
            })
            .setTimestamp(),
        ],
      });
    } catch (e: any) {
      console.log(e);
      return interaction.reply({
        embeds: [new EmbedBuilder().setColor('Red').setTitle(`Error`).setDescription(`\`\`\`${e.message}\`\`\``)],
      });
    }
  }
);
