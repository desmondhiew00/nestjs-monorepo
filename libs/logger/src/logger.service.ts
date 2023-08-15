import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import * as winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService implements NestLogger {
  logger: winston.Logger;

  constructor(dir: string) {
    let dirname = 'logs';
    if (dir) dirname += `/${dir}`;

    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf((info) => `[${info.timestamp}] [${info.level}] ${info.message}`)
      ),
      transports: [
        new winstonDailyRotateFile({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          filename: '%DATE%.log',
          dirname,
          maxSize: '20m',
          maxFiles: '30d'
        }),
        new winstonDailyRotateFile({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          filename: 'error-%DATE%.log',
          dirname,
          maxSize: '20m',
          maxFiles: '30d'
        })
      ]
    });

    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        })
      );
    }

    this.logger = logger;
  }

  public log(message: string) {
    this.logger.log({
      level: 'info',
      message: `${message}`
    });
  }

  public error(message: string, trace?: string) {
    this.logger.log({
      level: 'error',
      message: `${message}${trace ? `:${trace}` : ''}`
    });
  }

  public warn(message: string) {
    this.logger.log({
      level: 'warn',
      message: `${message}`
    });
  }

  public debug(message: string) {
    this.logger.log({
      level: 'debug',
      message: `${message}`
    });
  }

  public verbose(message: string) {
    this.logger.log({
      level: 'verbose',
      message: `${message}`
    });
  }
}
