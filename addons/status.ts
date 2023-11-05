import { logWithLabel } from '../src/utils/console';
import model from '../src/models/servers/economy';
import { Guild } from 'discord.js';
module.exports = async (client: any) => {
  const guild = client.guilds.cache.get('1099013284889370696');
  if (!guild) return;

  const channels = {
    usersOnline: guild.channels.cache.get('1170620191210737765'),
    economyUsers: guild.channels.cache.get('1170620283430916116'),
  };

  var CronJob = require('cron').CronJob;
  var job = new CronJob(
    '*/30 * * * *',
    function () {
      voiceStatus(guild);
    },
    null,
    true,
    'America/New_York'
  );
  job.start();

  async function voiceStatus(guild: Guild) {
    if (!channels.usersOnline || !channels.economyUsers) return;
    const users = guild.members.cache.filter((member) => !member.user.bot).size;
    const economyUsers = await model.countDocuments();

    channels.usersOnline
      ?.setName(`Users: ${users}`)
      .then((channel: { name: any }) => {
        logWithLabel('info', `Updated channel name to ${channel.name}`);
      })
      .catch((err: string) => {
        logWithLabel('error', err);
      });
    channels.economyUsers
      ?.setName(`Economy Users: ${economyUsers}`)
      .then((channel: { name: any }) => {
        logWithLabel('info', `Updated channel name to ${channel.name}`);
      })
      .catch((err: string) => {
        logWithLabel('error', err);
      });
  }
};
