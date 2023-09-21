import user from '../../models/economy/user';
import { Types } from 'mongoose';

/**
 * The function `getBalance` retrieves the balance of a user from a database based on their user ID and
 * guild ID.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used to find the user's balance in the database.
 * @param {string} guildId - The `guildId` parameter is a string that represents the unique identifier
 * of a guild or server in a Discord server.
 * @returns The function `getBalance` returns the `dbBalance` if it exists, otherwise it returns
 * `false`.
 */
const getBalance = async (userId: string, guildId: string) => {
  let dbBalance = await user.findOne({
    userId: userId,
    guildId: guildId,
  });

  if (!dbBalance) return false;
  return dbBalance;
};

/**
 * The function fetchBalance retrieves the balance of a user from a database, and if the balance does
 * not exist, it creates a new entry for the user.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used to query the database for the user's balance.
 * @param {string} guildId - The `guildId` parameter represents the unique identifier of a guild or
 * server in a Discord server.
 * @returns The function `fetchBalance` returns the `dbBalance` object.
 */
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

/**
 * The `toFixedNumber` function takes a number and returns it rounded to a specified number of decimal
 * places.
 * @param {number} number - The `number` parameter is the number that you want to round to a fixed
 * number of decimal places.
 * @param {number} [places=2] - The `places` parameter is the number of decimal places to round the
 * `number` to. By default, it is set to 2, which means the `number` will be rounded to 2 decimal
 * places if no value is provided for `places`.
 * @returns The function `toFixedNumber` returns a Promise that resolves to a number.
 */
const toFixedNumber = async (number: number, places: number = 2): Promise<number> => {
  const offset = Number(`1e${places}`);
  return Math.floor(number * offset) / offset;
};

/**
 * The function generates a random token of a specified length using a combination of uppercase
 * letters, lowercase letters, and numbers.
 * @param [length=16] - The `length` parameter is an optional parameter that specifies the length of
 * the generated token. If no value is provided for `length`, it defaults to 16.
 * @returns The function `generateToken` returns a randomly generated token string of the specified
 * length.
 */
const generateToken = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

export { getBalance, fetchBalance, generateToken, toFixedNumber };
