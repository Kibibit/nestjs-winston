import { Logger } from '@nestjs/common';

export class WinstonLogger {
  private readonly logger: Logger;
  private defaultMeta: Record<string, unknown> = {};

  /**
   * Creates an instance of WinstonLogger.
   */
  constructor(contextOrMeta: string, defaultMeta: Record<string, unknown>)
  constructor(contextOrMeta: Record<string, unknown>)
  constructor(contextOrMeta: string | Record<string, unknown>, defaultMeta?: Record<string, unknown>) {
    const context = typeof contextOrMeta === 'string' ? contextOrMeta : contextOrMeta.context as string | undefined;
    this.defaultMeta = typeof contextOrMeta === 'object' ? contextOrMeta : (defaultMeta || {});

    this.logger = new Logger(context, true);
  }
  /**
   * Log an info message
   *
   * @param {string} message
   * @param {object} meta
   * @memberof WinstonLogger
   */
  public log(message: string, meta: object = {}) {
    this.logger.log({ message, ...meta, ...this.defaultMeta });
  }

  /**
   * Log an info message
   * @param {string} message
   * @param {object} meta
   * @memberof WinstonLogger
   */
  public info(message: string, meta: object = {}) {
    this.logger.log({ message, ...meta, ...this.defaultMeta });
  }

  /**
   * Log a debug message
   * @param {string} message
   * @param {object} meta
   * @memberof WinstonLogger
   */
  public debug(message: string, meta: object = {}) {
    this.logger.debug({ message, ...meta });
  }

  /**
   * Log a verbose message
   * @param {string} message
   * @param {object} meta
   * @memberof WinstonLogger
   */
  public verbose(message: string, meta: object = {}) {
    this.logger.verbose({ message, ...meta, ...this.defaultMeta });
  }

  /**
   * Log an error message
   * @param {string} message
   * @param {object} meta
   * @memberof WinstonLogger
   */
  public error(message: string, meta: object = {}) {
    this.logger.error({ message, ...meta, ...this.defaultMeta });
  }

  /**
   * Log a warn message
   * @param {string} message
   * @param {object} meta
   * @memberof WinstonLogger
   */
  public warn(message: string, meta: object = {}) {
    this.logger.warn({ message, ...meta, ...this.defaultMeta });
  }
}
