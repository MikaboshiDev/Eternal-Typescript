import { PoruEvent } from '../../../global';
import { ButtonBuilder, ButtonStyle, TextChannel, ActionRowBuilder, EmbedBuilder } from "discord.js";
import tracks from "../../models/servers/tracks";

export const event: PoruEvent = {
    name: "queueEnd",
    run: async (client, player) => {
        const end = new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setLabel('Finished song')
          .setCustomId('end')
          .setDisabled(true);
        const data = await tracks.findOne({ guildID: player.guildId })
        const guild = client.guilds.cache.get(player.guildId);
        if (!guild) return;
        const channel = guild.channels.cache.get(player.textChannel);
        if (channel instanceof TextChannel) {
            const msg = await channel?.messages.fetch(data?.messageID!);
            await msg.edit({ components: [new ActionRowBuilder<ButtonBuilder>().addComponents(end)] });
            await tracks.findOneAndDelete({ guildID: player.guildId });

            channel?.send({
              embeds: [
                new EmbedBuilder()
                  .setAuthor({ name: 'Finished queue', iconURL: client.user!.displayAvatarURL() })
                  .setDescription(
                    'There are no more songs left to play. \nEnable **AutoPlay** so the queue never ends.'
                  )
                  .setThumbnail(client.user!.displayAvatarURL())
                  .setColor('Green'),
              ],
            });
            await delay(180000);
            if (player.isPlaying) {
                return;
            } else {
                return player.destroy();
            }
        }
    }
};

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}