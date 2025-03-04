import { createLogger, Logger, LoggerOptions } from 'winston';

import { LoggerService, Provider } from '@nestjs/common';

import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_OPTIONS,
  WINSTON_MODULE_PROVIDER
} from './winston.constants';
import {
  WinstonModuleAsyncOptions,
  WinstonModuleOptions
} from './winston.interfaces';

let winstonInstance: Logger;
class WinstonLogger implements LoggerService {
  constructor(private readonly logger: Logger) {}

  public log(message: any, context?: string) {
    return this.logger.info({ ...this.prepareMessage(message), context });
  }
  public error(message: any, trace?: string, context?: string) {
    return this.logger.error({ ...this.prepareMessage(message), trace, context });
  }
  public warn(message: any, context?: string) {
    return this.logger.warn({ ...this.prepareMessage(message), context });
  }
  public debug?(message: any, context?: string) {
    return this.logger.debug({ ...this.prepareMessage(message), context });
  }
  public verbose?(message: any, context?: string) {
    return this.logger.verbose({ ...this.prepareMessage(message), context });
  }

  private prepareMessage(message: any): object {
    if (!(message instanceof Object)) {
      message = { message };
    }
    return message;
  }
}

export function createWinstonProviders(
  loggerOpts: WinstonModuleOptions): Provider[] {
  return [
    {
      provide: WINSTON_MODULE_PROVIDER,
      useFactory: () => createLogger(loggerOpts)
    },
    {
      provide: WINSTON_MODULE_NEST_PROVIDER,
      useFactory: (logger: Logger) => {
        return new WinstonLogger(logger);
      },
      inject: [ WINSTON_MODULE_PROVIDER ]
    }
  ];
}

export function createWinstonAsyncProviders(
  options: WinstonModuleAsyncOptions): Provider[] {
  return [
    {
      provide: WINSTON_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || []
    },
    {
      provide: WINSTON_MODULE_PROVIDER,
      useFactory: (loggerOpts: LoggerOptions) => {
        winstonInstance = winstonInstance || createLogger(loggerOpts);

        return winstonInstance;
      },
      inject: [ WINSTON_MODULE_OPTIONS ]
    },
    {
      provide: WINSTON_MODULE_NEST_PROVIDER,
      useFactory: (logger: Logger) => {
        return new WinstonLogger(logger);
      },
      inject: [ WINSTON_MODULE_PROVIDER ]
    }
  ];
}
