import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: { target: 'pino-pretty' },
  });

  app.use(cors());
  app.use(pinoHttp({ logger }));
  app.use(cookieParser());

  app.use('/', router); // Префікс для всіх маршрутів

  app.use('*', notFoundHandler); // Обробка необроблених маршрутів

  app.use(errorHandler); // Глобальний обробник помилок

  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
};
