import 'colors';
type Labels =
  | 'error'
  | 'success'
  | 'debug'
  | 'shards'
  | 'express'
  | 'info'
  | 'routes'
  | 'licence'
  | 'websocket'
  | 'paypal'
  | 'discord'
  | 'addons'
  | 'poru';
function logWithLabel(label: Labels, message: string) {
  const labels: Record<Labels, string> = {
    error: '[ERROR]'.red,
    success: '[SUCCESS]'.green,
    licence: '[LICENCE]'.yellow,
    debug: '[DEBUG]'.blue,
    shards: '[SHARDS]'.yellow,
    express: '[EXPRESS]'.magenta,
    info: '[INFO]'.green,
    discord: '[DISCORD]'.black,
    paypal: '[PAYPAL]'.grey,
    routes: '[ROUTES]'.white,
    websocket: '[WEBSOCKET]'.gray,
    addons: '[ADDONS]'.blue,
    poru: '[PORU]'.red,
  };

  const formattedLabel = labels[label] || label || '';
  console.log(formattedLabel, message);
}

export { logWithLabel };
