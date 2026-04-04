import { randomUUID } from 'node:crypto';
import logger from '../utils/logger.js';

export function requestLogger(req, res, next) {
  req.requestId = randomUUID();
  const start = Date.now();

  res.on('finish', () => {
    logger.info({
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs: Date.now() - start,
    }, 'HTTP request');
  });

  next();
}