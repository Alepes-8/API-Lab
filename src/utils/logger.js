// Configure pino with your JSON shape and environment-aware transport (pretty in dev, raw JSON in prod).
// Replace console.log calls — anywhere you're currently logging, swap to logger.info(), logger.error(), etc. warn/log/error
// Add a request logging middleware — one middleware that fires on every request and logs { method, url, statusCode, responseTime, requestId }. This is where requestId gets attached.

/** Normal message is formated as following
 *      - {"level":30,"time":1773492773905,"pid":42120,"hostname":"DESKTOP-OUO8URB","msg":"Hello, world!"}
 * 
 * But of course it all can be adjusted.You can set levels with costumeLevels, or perhaps adjust the formating of a given message
 * Such as in this case, instead of giving logging with a level number, instead we have adjusted it to value of "error", "info", and
 * the rest of the logging values. This way it is easier and quicker to know if it is an error or just a message.
 * 
 * If you wanna redirect information, look
 */

import pino from 'pino';

const env = process.env.NODE_ENV || 'development';
const logPath = process.env.LOG_FILE_PATH || './logs/app.log';
const isTest = process.env.NODE_ENV === 'test';

const transport = env === 'development' || isTest
  ? pino.transport({
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    })
  : pino.transport({
      target: 'pino/file',
      options: { destination: logPath, mkdir: true },
    });

const logger = pino(
  isTest
    ? { enabled: false } // disable logging entirely in tests
    : {
        level: process.env.PINO_LOG_LEVEL || 'info',
        formatters: {
          level: (label) => ({ level: label.toUpperCase() }),
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      },
  transport
);

export default logger;