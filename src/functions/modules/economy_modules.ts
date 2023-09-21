import user from '../../models/economy/user';
import { Types } from 'mongoose';

const getBalance = async (userId: string, guildId: string) => {
  let dbBalance = await user.findOne({
    userId: userId,
    guildId: guildId,
  });

  if (!dbBalance) return false;
  return dbBalance;
};

const fetchBalance = async (userId: string, guildId: string) => {
  let dbBalance = await user.findOne({
    userId: userId,
    guildId: guildId,
  });

  if (!dbBalance) {
    dbBalance = await new user({
      _id: new Types.ObjectId(),
      userId: userId,
      guildId: guildId,
    });

    await dbBalance?.save().catch((err) => console.log(err));
    return dbBalance;
  }

  return dbBalance;
};

const toFixedNumber = async (number: number, places: number = 2): Promise<number> => {
  const offset = Number(`1e${places}`);
  return Math.floor(number * offset) / offset;
};

const generateToken = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

export { getBalance, fetchBalance, generateToken, toFixedNumber };
