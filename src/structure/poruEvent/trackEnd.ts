import { PoruEvent } from "../../../global";
import tracks from "../../models/servers/tracks";
import { ButtonBuilder, ButtonStyle, TextChannel, ActionRowBuilder } from "discord.js";

export const event: PoruEvent = {
    name: "trackEnd",
    run: async (client, player) => {
        const data = await tracks.findOne({ guildID: player.guildId });
        if (!data) return;
        const end = new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setLabel('Finished queue')
          .setCustomId('end')
          .setDisabled(true);
        const guild = await client.guilds.cache.get(player.guildId);
        const channel = await guild?.channels.cache.get(player.textChannel);
        if (channel instanceof TextChannel) {
            const msg = await channel.messages.fetch(data?.messageID!);
            await msg.edit({ components: [new ActionRowBuilder<ButtonBuilder>().addComponents(end)] })
        }
    }
}