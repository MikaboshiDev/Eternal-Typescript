import { Router, Request, Response } from 'express';
import { client } from '../../src/index';
import { ChannelType, EmbedBuilder } from 'discord.js';

const postApelation = async (req: Request, res: Response) => {
   const { user, user_id, razon, images } = req.body;
   const guild = client.guilds.cache.get(process.env.guild_id!);
   const member = guild?.members.cache.get(user_id!);

   if (!user_id || !user || !razon || !images)
      return res.status(400).json({ message: 'missing data' });
   if (user_id !== req.params.user)
      return res.status(400).json({ message: 'the user does not match' });
   if (!client.users.cache.get(user_id))
      return res.status(400).json({ message: 'the user does not exist' });
   if (!guild?.members.cache.get(user_id))
      return res.status(400).json({ message: 'the user is not in the server' });

   const channel = await guild.channels
      .create({
         name: `apelation-${user_id}`,
         type: ChannelType.GuildText,
         parent: process.env.apelation_category_id,
         topic: `apelation of ${user_id}`,
         permissionOverwrites: [
            {
               id: guild.roles.everyone.id,
               deny: ['ViewChannel'],
            },
            {
               id: user_id,
               allow: ['ViewChannel', 'SendMessages'],
               deny: ['UseApplicationCommands', 'AddReactions'],
            },
         ],
      })
      .then((data) => {
         data.send({
            content: `<@${user_id}>`,
            embeds: [
               new EmbedBuilder()
                  .setTitle(`Apelation - ${user}`)
                  .setDescription(razon)
                  .setFooter({
                     text: `User ID: ${user_id}`,
                     iconURL: member?.user.avatarURL()!,
                  })
                  .setTimestamp(new Date()),
            ],
         });
      });

   return res.status(200).json({
      message: 'ok',
      razon: razon,
      day: new Date().getDate(),
   });
};

const postReport = async (req: Request, res: Response) => {
   const { username, userid, report } = req.body;
   const guild = client.guilds.cache.get(process.env.guild_id!);
   const member = guild?.members.cache.get(userid!);

   if (!username || !userid || !report)
      return res.status(400).json({ message: 'missing data' });
   if (!client.users.cache.get(userid))
      return res.status(400).json({ message: 'the user does not exist' });
   if (!guild?.members.cache.get(userid))
      return res.status(400).json({ message: 'the user is not in the server' });

   const channel = client.channels.cache.get(process.env.report_channel_id!);
   if (!channel)
      return res.status(400).json({ message: 'the channel does not exist' });
   if (channel.isTextBased()) {
      const embed = new EmbedBuilder()
         .setTitle(`Report - ${username}`)
         .setDescription(report)
         .setFooter({
            text: `User ID: ${userid}`,
            iconURL: member?.user.avatarURL()!,
         })
         .setTimestamp(new Date());

      channel.send({ embeds: [embed] });
   }
};

export { postApelation, postReport };
