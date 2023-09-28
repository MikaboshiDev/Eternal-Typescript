import { createLogger, format, transports } from 'winston';
import { logWithLabel } from '../../../utils/console';
import { Event } from '../../../class/builders';

const rn = new Date();
const date = `logs-${rn.getMonth() + 1}-${rn.getDate()}-${rn.getFullYear()}.log`;

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((log) => `[${log.timestamp.split('T')[1].split('.')[0]} ${log.level}] ${log.message}`)
  ),
  transports: [new transports.Console(), new transports.File({ filename: `upload/logs/${date}` })],
  rejectionHandlers: [new transports.Console(), new transports.File({ filename: `upload/logs/${date}` })],
  exceptionHandlers: [new transports.Console(), new transports.File({ filename: `upload/logs/${date}` })],
});

export default new Event('ready', async (client) => {
  client.on('warn', (warning) => {
    logger.warn('Warning:', warning);
  });

  client.on('error', (error) => {
    logger.error('Error:', error);
  });
});
