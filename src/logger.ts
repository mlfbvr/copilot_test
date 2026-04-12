import { createLogger, format, transports } from 'winston';

const VALID_LOG_LEVELS = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
const configuredLevel = process.env.LOG_LEVEL ?? 'info';
const level = VALID_LOG_LEVELS.includes(configuredLevel) ? configuredLevel : 'info';

if (process.env.LOG_LEVEL && !VALID_LOG_LEVELS.includes(process.env.LOG_LEVEL)) {
  console.warn(`Invalid LOG_LEVEL "${process.env.LOG_LEVEL}". Falling back to "info".`);
}

const logger = createLogger({
  level,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [new transports.Console()],
});

export default logger;
