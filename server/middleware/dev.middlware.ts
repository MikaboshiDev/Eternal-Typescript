import { Request, Response, NextFunction } from 'express';
import { client } from '../../src/index';

const devMiddlware = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.user;
    const user = await client.users.cache.get(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });    

    const serverid = process.env.guild_id || '';
    const guild = await client.guilds.cache.get(serverid);
    if (!guild) return res.status(404).json({ error: 'Guild not found' });

    const member = await guild.members.fetch(user.id);
    if (!member || !member.permissions.has("Administrator")) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    next();
};

export { devMiddlware };