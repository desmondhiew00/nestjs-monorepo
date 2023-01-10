<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

```bash
NestJS Monorepo with shared database modeling
# https://docs.nestjs.com/cli/monorepo#monorepo-mode
```

## Installation

```bash
$ yarn
```

## Running the app (Monorepo)

```bash
# development
$ yarn start <app-name>

# watch mode
$ yarn start:dev <app-name>

# production mode
$ yarn start:prod <app-name>
```

## Test

```bash
# unit tests
$ npm run test <app-name>

# e2e tests
$ npm run test:e2e <app-name>

# test coverage
$ npm run test:cov <app-name>
```

## Build

```bash

$ yarn build <app-name>

# run as production
$ node dist/apps/<app-name>/main.js

```

## Database migration

```bash
# generate migration file (based on `lib/src/entities` changes)
$ yarn migration:gen

# run migration
$ yarn migration:run

# undo migration
$ yarn migration:revert

# generate seed
$ yarn migration:seed:gen

# run seeder
$ yarn migration:seed:run


```

## Nest CLI (File generator)

```bash
$ yarn generate <schematic> [name] [options]

# [Reference](https://docs.nestjs.com/cli/usages#nest-generate)

# Generate graphql module
$ yarn generate resource --no-spec
  # 1. Select project
  # 2. Define module name
  # 3. Select `GraphQL (code first)`
  # 4. CRUD entry points: type N

# Generate rest api module
$ yarn generate resource --no-spec
  # 1. Select project
  # 2. Define module name
  # 3. Select `REST AP`
  # 4. CRUD entry points: type N

```

## Generate entities (model) from existing database

```markdown
1. export sql from [dbdiagram.io](https://dbdiagram.io/) 
<!-- (make sure table column type is correct) -->
<!-- (make sure table foreign key relation is defined) -->
<!-- (check column is it nullable) -->
1. run the exported sql (create tables to database)
2. update `.env` database config
3. $ yarn generate:entities
4. check and update generated entities [path: `libs/database/src/entities`]
5. generate migration from entities
6. delete all tables from database 
7. run typeorm migration
8. continue development
```

## File Structure

```bash
├── apps # Monorepo applications (Note: each app will run on diff port)
│   ├── app
│   │     └── src
│   │          ├── configs
│   │          │     └── *.config.ts 
│   │          ├── decorators
│   │          │     └── *.decorator.ts # CL: $ yarn generate d <name>
│   │          ├── guards
│   │          │     └── *.guard.ts # CL: $ yarn generate gu <name>
│   │          ├── middlewares
│   │          │     └── *.middleware.ts # CL: $ yarn generate mi <name>
│   │          ├── pipes
│   │          │     └── *.pipe.ts # CL: $ yarn generate pi <name>
│   │          ├── interceptors
│   │          │     └── *.interceptor.ts # CL: $ yarn itc pi <name>
│   │          ├── modules # CL: $ yarn generate resource <name>
│   │          │     └── <module-name>
│   │          │           ├── dto # Data transfer types (between FE and BE)
│   │          │           │    └── *.dto.ts
│   │          │           ├── events
│   │          │           │    └── *.event.ts
│   │          │           ├── listeners
│   │          │           │    └── *.listener.ts
│   │          │           │    
│   │          │           ├── *.controller.ts # Rest API  (CL: $ yarn generate co <name>)
│   │          │           ├── *.resolver.ts # Graphql (CL: $ yarn generate res <name>)
│   │          │           ├── *.service.ts # Logic (CL:  $ yarn generate s <name>)
│   │          │           └── *.module.ts # (CL: $ yarn generate mo <name>)
│   │          ├── types
│   │          │     └── *.type.ts
│   │          ├── app.module.ts
│   │          └── main.ts
│   │
│   └── <other-app> # CL: $ yarn generate app
│
├── typeorm # migration folder
│   ├── migrations
│   └── seeds
│
├── libs # Application shared library
│   ├── database # core lib
│   │   └── src
│   │       ├── base
│   │       ├── entities
│   │       │     └── *.entity.ts # database mapper (modeling)
│   │       ├── dto
│   │       │     └── *.dto.ts # data transfer
│   │       └── subscribers
│   │             └── *.subscriber.ts # model hooks
│   ├── utils # Common / Reusable code for different project
│   │   └── src
│   │       └── **/*.ts
│   │
│   └── <lib-name>
│
├── logs
├── scripts # npm script
│
├── .env # Global env (shared to all app) cannot be override
├── .admin.env # Monorepo env (not shared) Note: not work with `import 'dotenv/config'`
├── .<app-name>.env
├── .env.sample
├── .eslintrc.js # eslint config
├── .gitignore
├── .prettierrc # prettier config
├── package.json # dependencies
└── tsconfig.json # typescript config
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
