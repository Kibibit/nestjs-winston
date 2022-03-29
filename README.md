<p align="center">
  <a href="https://github.com/Kibibit/nestjs-winston" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" /></a>
  <h2 align="center">
    @kibibit/nestjs-winston
  </h2>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@kibibit/configit"><img src="https://img.shields.io/npm/v/@kibibit/configit/latest.svg?style=for-the-badge&logo=npm&color=CB3837"></a>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/@kibibit/configit"><img src="https://img.shields.io/npm/v/@kibibit/configit/beta.svg?logo=npm&color=CB3837"></a>
<a href="https://codecov.io/gh/Kibibit/configit">
  <img src="https://codecov.io/gh/Kibibit/configit/branch/beta/graph/badge.svg?token=DrXLrpuExK">
</a>
<a href="https://github.com/Kibibit/configit/actions/workflows/build.yml">
  <img src="https://github.com/Kibibit/configit/actions/workflows/build.yml/badge.svg?style=flat-square&branch=beta" alt="Build">
</a>
<a href="https://github.com/Kibibit/configit/actions/workflows/tests.yml">
  <img src="https://github.com/Kibibit/configit/actions/workflows/tests.yml/badge.svg?branch=beta" alt="Tests">
</a>
<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"></a>
 <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" alt="All Contributors"></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>
<p align="center">
  Winston for <a href="https://github.com/nestjs/nest">NestJS</a> has never been this easy!
</p>
<hr>
## Installation

```bash
npm install --save @kibibit/nestjs-winston
```

## What does it do?
This package not only wraps winston into a Nest Module like other packages, it also creates a <b>Nest LoggerService</b>, so you can keep using the default NestJS logger, which enjoying winston.
But that's not all, it also takes those great things from the NestJS Logger. It adds the context into the winston meta (so it can later be search and indexed in your <b>ELK/Datadog</b>).

Another great feature is the <b>winston formatter</b> add to the class that in local mode allows easy and readable logs to the console.

## Quick Start

Import `WinstonModule` and use the `forRoot()` method to configure it. This method accepts the same options object as [`createLogger()`](https://github.com/winstonjs/winston#usage) function from the winston package:

```typescript
import { Module } from '@nestjs/common';
import { WinstonModule } from '@payk/nestjs-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      // options here
    }),
  ],
})
export class AppModule {}
```


## Async configuration

> **Caveats**: because the way Nest works, you can't inject dependencies exported from the root module itself (using `exports`). If you use `forRootAsync()` and need to inject a service, that service must be either imported using the `imports` options or exported from a [global module](https://docs.nestjs.com/modules#global-modules).

Maybe you need to asynchronously pass your module options, for example when you need a configuration service. In such case, use the `forRootAsync()` method, returning an options object from the `useFactory` method:

```typescript
import { Module } from '@nestjs/common';
import { WinstonModule } from '@payk/nestjs-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        // options
      }),
      inject: [],
    }),
  ],
})
export class AppModule {}
```

The factory might be async, can inject dependencies with `inject` option and import other modules using the `imports` option.

## Use as the main Nest Logger (preferred way)

If you want to use winston logger across the whole app, including bootstrapping and error handling, use the following:

Define:
```typescript
import { WINSTON_MODULE_NEST_PROVIDER } from '@payk/nestjs-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
}
bootstrap();
```

Use:
```typescript
import { WinstonLogger } from '@payk/nestjs-winston';

export class ClassName {
  private readonly logger = new WinstonLogger(ClassName.name);
}
```

## Nest Winston Formatter
To allow a better visibility a unique formatter is provided
```typescript
import { winstonConsoleFormat } from '@payk/nestjs-winston';

WinstonModule.forRoot({
  level: 'info',
  //format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [

    new winston.transports.Console({
      format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize({ all: true }),
                winstonConsoleFormat
              )
    })
  ]
})
```


## Features
- Supports JSON\YAML files\env variables\cli flags as configuration inputs. See `yaml-config` in the examples folder
- Supports shared configuration files (same file shared for multiple projects)
- initialize a configuration file with `--saveToFile` or `--init`
- save configuration files anywhere above your project's package.json
- forced singleton for a single installation (reuse same class)
- testable
- The ability to create json schemas automatically and add descriptions
  to configuration variables
- Get meaningfull errors when configuration is wrong!

## Examples
See the examples folder for a variety of usage examples

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://thatkookooguy.kibibit.io/"><img src="https://avatars3.githubusercontent.com/u/10427304?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Neil Kalman</b></sub></a><br /><a href="https://github.com/Kibibit/configit/commits?author=Thatkookooguy" title="Code">💻</a> <a href="https://github.com/Kibibit/configit/commits?author=Thatkookooguy" title="Documentation">📖</a> <a href="#design-Thatkookooguy" title="Design">🎨</a> <a href="#maintenance-Thatkookooguy" title="Maintenance">🚧</a> <a href="#infra-Thatkookooguy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Kibibit/configit/commits?author=Thatkookooguy" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<div>Logo made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
<br>

## Stay in touch

- Author - [Neil Kalman](https://github.com/thatkookooguy)
- Website - [https://github.com/kibibit](https://github.com/kibibit)
- StackOverflow - [thatkookooguy](https://stackoverflow.com/users/1788884/thatkookooguy)
- Twitter - [@thatkookooguy](https://twitter.com/thatkookooguy)
- Twitter - [@kibibit_opensrc](https://twitter.com/kibibit_opensrc)
