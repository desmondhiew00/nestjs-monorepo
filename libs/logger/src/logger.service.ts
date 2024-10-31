import { Injectable, LoggerService as NestLogger } from '@nestjs/common';

import * as path from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export type LogError = string | Error;

export interface Options extends winston.LoggerOptions {
  logMaxSize?: string;
  logMaxFiles?: string;
  verify?: (message: LogError) => LogError | Promise<LogError> | null;
}

@Injectable()
export class LoggerService implements NestLogger {
  public logger: winston.Logger;
  private logMaxSize = '20m';
  private logMaxFiles = '30d';

  private verify: ((message: LogError) => LogError | Promise<LogError> | null) | null = null;

  constructor(folder: string, options?: Options) {
    const dirname = path.join('logs', folder);

    if (options?.verify) this.verify = options.verify;
    if (options?.logMaxSize) this.logMaxSize = options.logMaxSize;
    if (options?.logMaxFiles) this.logMaxFiles = options.logMaxFiles;

    this.logger = winston.createLogger({
      format: this.getLogFormat(),
      transports: [
        this.createRotateTransport('debug', '%DATE%.log', dirname),
        this.createRotateTransport('error', 'error-%DATE%.log', dirname),
      ],
      ...options,
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(this.createConsoleTransport());
    }
  }

  private getLogFormat() {
    return winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.printf(({ timestamp, level, message, stack }) => {
        const formattedMessage = stack ? `${message}\n${stack}` : message as string;
        return `[${timestamp}] [${level}] ${formattedMessage}`;
      }),
    );
  }

  private createRotateTransport(level: string, filename: string, dirname: string) {
    return new winston.transports.DailyRotateFile({
      level,
      datePattern: 'YYYY-MM-DD',
      filename,
      dirname,
      maxSize: this.logMaxSize || '20m',
      maxFiles: this.logMaxFiles || '30d',
    });
  }

  private createConsoleTransport() {
    return new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          const formattedMessage = stack ? `${message}\n${stack}` : message as string;
          return `[${timestamp}] [${level}] ${formattedMessage}`;
        }),
      ),
    });
  }

  private getLogMessage(message: LogError) {
    return this.verify ? this.verify(message) ?? message : message;
  }

  public log(message: LogError) {
    this.logger.info(this.getLogMessage(message));
  }

  public info(message: LogError) {
    this.logger.info(this.getLogMessage(message));
  }

  public async error(message: LogError, trace?: string) {
    const logMsg = await this.getLogMessage(message);
    const exception = trace?.split(':')[0];
    this.logger.error(`${exception ? `[${exception}] ` : ''}${logMsg}`, {
      stack: trace,
    });
  }

  public warn(message: LogError) {
    this.logger.warn(this.getLogMessage(message));
  }

  public debug(message: LogError) {
    this.logger.debug(this.getLogMessage(message));
  }

  public verbose(message: LogError) {
    this.logger.verbose(this.getLogMessage(message));
  }
}
