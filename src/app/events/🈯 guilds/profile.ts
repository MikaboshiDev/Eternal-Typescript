import { fetchBalance, toFixedNumber } from '../../../functions/modules/economy_modules';
import { Event } from '../../../class/builders';
import user from '../../../models/economy/user';

export default new Event('messageCreate', async (message) => {
  if (message.author.bot || !message.guild || !message.channel) return;
  const authorId = message.author?.id;
  const guildId = message.guild?.id;

  const randomAmount = Math.random() * (0.7 - 0.3) + 0.3;
  const dbBalance = await fetchBalance(guildId, authorId);
  if (!dbBalance) return;

  await user.findOneAndUpdate(
    { _id: dbBalance._id },
    {
      balance: await toFixedNumber(dbBalance.balance + randomAmount),
    }
  );
});
