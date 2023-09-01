import 'colors';
type Labels =
   | 'error'
   | 'success'
   | 'debug'
   | 'shards'
   | 'express'
   | 'info'
   | 'discord';
function logWithLabel(label: Labels, message: string) {
   const labels: Record<Labels, string> = {
      error: '[ERROR]'.red,
      success: '[SUCCESS]'.green,
      debug: '[DEBUG]'.blue,
      shards: '[SHARDS]'.yellow,
      express: '[EXPRESS]'.magenta,
      info: '[INFO]'.cyan,
      discord: '[DISCORD]'.black,
   };

   const formattedLabel = labels[label] || label || '';
   console.log(formattedLabel, message);
}

export { logWithLabel };
