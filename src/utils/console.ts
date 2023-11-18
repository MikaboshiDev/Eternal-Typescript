/**
 * The code exports a function called `logWithLabel` that logs a message with a specified label.
 * @param {Labels} label - The `label` parameter is of type `Labels`, which is a union type
 * representing different label options such as `'error'`, `'success'`, `'debug'`, etc. It is used to
 * specify the type of label to be used in the log message.
 * @param {string} message - The `message` parameter in the `logWithLabel` function is a string that
 * represents the message you want to log. It is the content that will be displayed alongside the label
 * in the console.
 */

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

function logWithLabel(label: Labels, message: string) {
  const formattedLabel = labels[label] || label || '';
  console.log(formattedLabel, message);
}

export { logWithLabel };
