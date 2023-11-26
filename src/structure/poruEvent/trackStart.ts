import { PoruEvent } from '../../../global';
import { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder, TextChannel } from "discord.js";
import { formatDuration } from "../../functions/tools/musicFunctions";
import tracks from "../../models/servers/tracks";

export const event: PoruEvent = {
    name: "trackStart",
    run: async (client, player, track) => {
        const stop = new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Stop").setCustomId("stop")
        const skip = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Skip").setCustomId("skip")
        const pause = new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Pause").setCustomId("pause")
        const list = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("List").setCustomId("playlist")
        const auto = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("AutoPlay").setCustomId("autoplay")
        const btn = new ActionRowBuilder<ButtonBuilder>().addComponents(pause, skip, stop, list, auto)

        const trackDuration = track.info.isStream ? "LIVE" : formatDuration(track.info.length);
        const author = track.info.requester || client.user;
        const embed = new EmbedBuilder()
            .setAuthor({
                name: (`${author.tag} the track started`),
                iconURL: author.displayAvatarURL(),
            })
            .setDescription(`**[${track.info.title}](${track.info.uri})** de \`${(track.info.author)}\``)
            .addFields(
                { name: "Duratión", value: `\`${trackDuration}\``, inline: true },
                { name: "In line", value: `\`${player.queue.length} canciones\``, inline: true }
            )
            .setColor("Green")
            .setThumbnail(track.info.image);
        const guild = await client.guilds.cache.get(player.guildId);
        if (!guild) return;
        const channel = await guild.channels.cache.get(player.textChannel);
        if (channel instanceof TextChannel) {
            const msg = await channel?.send({ embeds: [embed], components: [btn] });
            await tracks.findOneAndUpdate({ guildID: player.guildId }, { messageID: msg.id }, { new: true, upsert: true });
        }
    }
}