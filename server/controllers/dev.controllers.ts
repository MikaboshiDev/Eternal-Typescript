import UserModel from '../../src/models/auth';
import { Request, Response } from 'express';
import { client } from '../../src/index';
import moment from 'moment';

const getStatus = (req: Request, res: Response) => {
   const users = client.users.cache.size;
   const guilds = client.guilds.cache.size;
   const channels = client.channels.cache.size;
   const emojis = client.emojis.cache.size;

   return res.status(200).json({
      message: 'OK',
      data: {
         users: users,
         guilds: guilds,
         channels: channels,
         emojis: emojis,
         uptime: moment(client.uptime).format('HH:mm:ss'),
      },
   });
};

const getAllUsers = async (req: Request, res: Response) => {
   const data = await UserModel.find();
   return res.status(200).json({
      message: 'OK',
      data: data,
   });
};

const getBans = async (req: Request, res: Response) => { 
   const guild = client.guilds.cache.get(process.env.guild_id!);
   if (!guild) return res.status(500).json({ message: 'Internal Server Error' });

   const bans = await guild?.bans.fetch();
   return res.status(200).json({ message: 'OK', data: bans });
}

export { getStatus, getAllUsers, getBans };
