import {
	ActionRowBuilder,
	CategoryChannel,
	ChannelType,
	EmbedBuilder,
	StringSelectMenuBuilder,
	TextChannel,
	userMention,
} from "discord.js";
import { Event } from "../../../functions/modules/builders";
import { createTranscript } from "discord-html-transcripts";
import emojis from "../../../../config/json/emojis.json";
import { logWithLabel } from "../../../utils/console";
import modelSet from "../../../models/tickets/setup";
import model from "../../../models/tickets/system";
import { client } from "../../../enderman";

export default new Event("ready", async () => {
	const guildId = client.config.dashboard.guild_id;
	const guild = client.guilds.cache.get(guildId);
	if (!guild) return;

	const data = await model.find({ GuildID: guildId });
	if (!data) return;

	setInterval(async () => {
		data.forEach(async (ticket) => {
			const avatarURL = client.guilds.cache
				.get(ticket.GuildID!)
				?.members.cache.get(ticket.CreatedBy!)
				?.user.displayAvatarURL()!;
			const channel = client.channels.cache.get(ticket.ChannelID!) as TextChannel;
			if (!channel) return;

			const dataSet = await modelSet.findOne({ GuildID: guildId });
			if (!dataSet) return;

			const messages = await channel.messages.fetch({ limit: 1 }).catch(() => null);
			const lastMessage = messages?.first();

			if (!lastMessage) {
				try {
					if (channel.name.startsWith("suspended-")) return;
					channel.send({
						embeds: [
							new EmbedBuilder()
								.setAuthor({
									name: "Ticket Inactive - Manager",
									iconURL: client.user?.displayAvatarURL()!,
								})
								.setThumbnail(avatarURL!)
								.setColor("Red")
								.setDescription(
									[
										`${emojis.time} | Good morning ${userMention(
											ticket.CreatedBy!,
										)} due to your inactivity of more than \`2 hours\``,
										`your ticket has been marked as suspended until further notice`,
									].join("\n"),
								),
						],
					});
					channel.setName("suspended-" + ticket.CreatedBy!).catch(() => null);
				} catch (error) {
					logWithLabel("error", `The error is: ${error}`);
					console.error(error);
				}
			} else {
				try {
					const currentTime = new Date().getTime();
					const lastMessageTime = lastMessage.createdAt.getTime();
					const difference = (currentTime - lastMessageTime) / (1000 * 60 * 60);
					if (difference >= 24) {
						// 24 hours of inactivity
						if (!channel.name.startsWith("suspended-")) return;
						const transcript = await createTranscript(channel, {
							limit: -1,
							filename: `transcript-${channel.id}.html`,
							poweredBy: true,
						});

						const channelTranscript = await guild.channels.cache.get(dataSet.Transcripts!);
						(channelTranscript as TextChannel)
							.send({
								content: `Ticket Closed: ${
									ticket.TicketID
								}, Date of Closure: ${new Date().toLocaleString()} at ${new Date().toLocaleTimeString()} by user: <@${
									client.user?.id
								}> `,
								embeds: [
									new EmbedBuilder()
										.setColor("Green")
										.setTitle("Ticket Closed Records!")
										.setThumbnail(guild?.iconURL({ forceStatic: true })!)
										.setDescription(
											[
												`\`👤\` **Moderator:** ${client.user} (\`${client.user?.id}\`)`,
												`\`🔥\` **Closure Reason:** 🔴 No closure reason provided`,
											].join("\n"),
										)
										.setFooter({
											text: `Ticket Closed By: ${client.user?.tag}`,
											iconURL: guild?.iconURL({ forceStatic: true })!,
										}),
								],
								files: [transcript],
							})
							.then(() => {
								const creador = client.users.cache.get(ticket.CreatedBy!);
								const botones = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
									new StringSelectMenuBuilder()
										.setCustomId("reseñas")
										.setPlaceholder("Please select a rating from 1 to 5 ⭐ Stars")
										.addOptions(
											{ label: "1 ⭐", description: "Very poor support service to me", value: "first_option" },
											{ label: "2 ⭐", description: "Poor support service to me", value: "second_option" },
											{ label: "3 ⭐", description: "Average support service to me", value: "third_option" },
											{ label: "4 ⭐", description: "Good support service to me", value: "fourth_option" },
											{ label: "5 ⭐", description: "Excellent support service to me", value: "fifth_option" },
										),
								);

								creador
									?.send({
										content: `Hey! Thank you so much for opening a ticket with us :D. I hope the support was helpful to you. If you have any questions or suggestions, feel free to open a ticket again!`,
										embeds: [
											new EmbedBuilder()
												.setColor("Green")
												.setTitle("Ticket Closed Records!")
												.setThumbnail(guild?.iconURL({ forceStatic: true })!)
												.setDescription(
													[
														`\`👤\` **Moderator:** ${client.user} (\`${client.user?.id}\`)`,
														`\`🔥\` **Closure Reason:** 🔴 No closure reason provided`,
													].join("\n"),
												)
												.setFooter({
													text: `Ticket Closed By: ${client.user?.tag}`,
													iconURL: guild?.iconURL({ forceStatic: true })!,
												}),
										],
										components: [botones],
										files: [transcript],
									})
									.catch(() => {
										logWithLabel("discord", `The user ${creador?.tag} has blocked me`);
									});
							});

						setTimeout(() => channel.delete().then(() => model.deleteOne({ ChannelID: channel.id })), 5 * 1000);
					} else if (difference >= 2 && difference < 24) {
						// 2 hours of inactivity
						if (channel.name.startsWith("suspended-")) return;
						channel.send({
							embeds: [
								new EmbedBuilder()
									.setAuthor({
										name: "Ticket Inactive - Manager",
										iconURL: client.user?.displayAvatarURL()!,
									})
									.setThumbnail(avatarURL!)
									.setColor("Red")
									.setDescription(
										[
											`${emojis.time} | Good morning ${userMention(
												ticket.CreatedBy!,
											)} due to your inactivity of more than \`2 hours\``,
											`your ticket has been marked as suspended until further notice`,
										].join("\n"),
									),
							],
						});
						channel.setName("suspended-" + ticket.CreatedBy!).catch(() => null);
					}
				} catch (error) {
					logWithLabel("error", `The error is: ${error}`);
					console.error(error);
				}
			}
		});
	}, 1000 * 60 * 30); // 30 minutes
});
