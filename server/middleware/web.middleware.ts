import { NextFunction, Request, Response } from 'express';
import { client } from '../../src/shulker';

interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
}

const checkGuildAndMember = (req: Request, res: Response, next: NextFunction, requiredRoleId: string) => {
  const guild = client.guilds.cache.get(client.config.general.guild_id!);
  if (!guild) return res.send(`<script>alert('Guild not found!');</script>`);
  const member = guild?.members.cache.get((req.user as User).id);
  if (!member) return res.send(`<script>alert('Member not found!');</script>`);
  if (!member.roles.cache.has(requiredRoleId)) return res.send(`<script>alert('You are not authorized!');</script>`);

  next();
};

const devWebMiddleware = (req: Request, res: Response, next: NextFunction) => {
  checkGuildAndMember(req, res, next, client.config.dashboard.developer_id!);
};

const customerWebMiddleware = (req: Request, res: Response, next: NextFunction) => {
  checkGuildAndMember(req, res, next, client.config.dashboard.customer_id!);
};

export { customerWebMiddleware, devWebMiddleware };
