import { Router, Request, Response } from "express";
import { client } from "../../src/index"
import { ChannelType } from "discord.js";

const postApelation = async (req: Request, res: Response) => {
    const { user, user_id, razon, images } = req.body;
    const guild = client.guilds.cache.get(process.env.guild_id!);
    const member = guild?.members.cache.get(user_id!);

    if (!user_id || !user || !razon || !images) return res.status(400).json({ message: 'missing data' });
    if (user_id !== req.params.user) return res.status(400).json({ message: "the user does not match" });
    if (!client.users.cache.get(user_id)) return res.status(400).json({ message: "the user does not exist" });
    if (!guild?.members.cache.get(user_id)) return res.status(400).json({ message: "the user is not in the server" });

    const channel = await guild.channels.create({
        name: `apelation-${user_id}`,
        type: ChannelType.GuildText,
        parent: process.env.apelation_category_id,
        topic: `apelation of ${user_id}`,
        permissionOverwrites: [
            {
                id: guild.roles.everyone.id,
                deny: [
                    "ViewChannel"
                ]
            },
            {
                id: user_id,
                allow: [
                    "ViewChannel",
                    "SendMessages"
                ],
                deny: [
                    "UseApplicationCommands",
                    "AddReactions"
                ]
            }
        ]
    }).then((data) => {
        data.send({
            content: `<@${user_id}>`,
            embeds: [
                {
                    title: "Apelation",
                    description: `apelation of ${user}`,
                    fields: [
                        {
                            name: "Razon",
                            value: razon
                        }
                    ]
                }
            ],
            files: images
        })
    });

    return res.status(200).json({ 
        message: "ok",
        razon: razon,
        day: new Date().getDate(),
    });
}

export { postApelation }