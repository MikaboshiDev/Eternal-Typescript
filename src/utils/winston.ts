const date = `-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
import winston, { createLogger, format, transports } from 'winston';
const ruta = 'config/upload/logs';

export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf((log) => `[${log.timestamp.split('T')[1].split('.')[0]} ${log.level}] ${log.message}`)
  ),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.File({ filename: `${ruta}/log${date}.log` })],
  rejectionHandlers: [new winston.transports.File({ filename: `${ruta}/log${date}.log` })],
  exceptionHandlers: [new winston.transports.File({ filename: `${ruta}/log${date}.log` })],
});
