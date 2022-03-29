import colors from 'colors';
import { format } from 'winston';

export const winstonConsoleFormat = format.printf(({ context, level, timestamp, message, ...meta }) => {
  // eslint-disable-next-line max-len
  return `${ level }: ${ new Date(timestamp).toLocaleString() }\t [${ colors.yellow(context) }] ${ message } - ${ JSON.stringify(meta) }`;
});
