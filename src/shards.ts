/* import { logWithLabel } from './utils/console';
import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '.env') });
const Sharding = new ShardingManager(join(__dirname, 'index.ts'), {
   token: process.env.token,
   totalShards: 1,
   respawn: true,
});

const Sharding_Options = {
   amount: Sharding.totalShards,
   delay: 5500,
   timeout: 30000,
};

Sharding.spawn(Sharding_Options);
Sharding.on('shardCreate', (shard) => {
   logWithLabel(
      'shards',
      [
         `Shard ${shard.id}: Spawned recursively!`,
         `Shard ${shard.id}: PID: ${shard.process?.pid}`,
      ].join('\n')
   );
});
 */