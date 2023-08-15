<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

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
yarn
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

# pm2 deployment
$ yarn build
$ pm2 start dist/apps/<app-name>/main.js --name <name>

```

## Common used command line

```bash
# Create & initialize new app
$ yarn generate app <app-name>
$ yarn app:init

# Database mapping & logic
$ yarn db:entity
$ yarn db:subscriber

# GraphQL CRUD & DTO
$ yarn db:dto
$ yarn db:authorizer

# Create new module (inside monorepo)
$ yarn generate mo <module-name> -p <app-name>
$ yarn generate service <module-name> -p <app-name>
$ yarn generate resolver <module-name> -p <app-name>
$ yarn generate controller <module-name> -p <app-name>
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

**[Nest CLI Reference](https://docs.nestjs.com/cli/usages#nest-generate)**

```bash
$ yarn generate <schematic> [name] [options]

# Generate module (.module, .service, .resolver, .controller)
$ yarn generate resource
  # 1. Select project
  # 2. Define module name
  # 3. Select `GraphQL (code first)` or `REST AP`
  # 4. CRUD entry points: type N

# Generate file to "apps/app/src/modules/<module>/<schematic>.ts"
# schematic: module | resolver| service| controller
$ yarn generate <schematic>
```

## Create new app (monorepo)

apps/`<new-app-name>`

```bash

yarn generate app <name>

yarn app:init

```

## Create new library

libs/`<new-app-name>`

```bash

yarn generate lib <name>

```

## Library: Database CLI (File generator)

libs/database

```bash
# Generate `.entity.ts`
# Output libs/database/src/entities/.entity.ts
# Auto imported to `database.module.ts`
$ yarn db:entity

# Generate `.entity.ts`
# Output: libs/database/src/subscribers/.subscriber.ts
# Auto imported to `database.module.ts`
$ yarn db:subscriber

# Generate `.dto` `.module` `.service` `.index`
# Output: libs/database/src/graphql
# Required: predefined entity file, generate fields based on selected entity
$ yarn db:dto

# Generate `.authorizer`
# Output: libs/database/src/graphql/<module>/.authorizer.ts
$ yarn db:authorizer

# Generate `.hook`
# Output: libs/database/src/graphql/<module>/.hook.ts
$ yarn db:hook

```

## File Structure

```bash
├── _templates # File Generator
├── .husky # Pre commit script
├── .vscode # VSCode workspace configs
│
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
├── configs # global configs (shared to all apps)
│   ├── env
│   └── <name>.config.ts
│
│
├── libs # Application shared library
│   ├── database # core lib
│   │   └── src
│   │       ├── environment.ts # env variables for this library
│   │       ├── base
│   │       ├── graphql
│   │       │     └── <module>
│   │       │          ├── *.dto.ts # graphql modeling
│   │       │          ├── *.module.ts # graphql CRUD module
│   │       │          ├── *.service.ts # soft delete feature for graphql CRUD
│   │       │          ├── *.authorizer.ts # apply custom filter to .dto
│   │       │          ├── *.hook.ts # custom hook for .dto
│   │       │          └── *.index.ts
│   │       ├── entities
│   │       │     └── *.entity.ts # db table mapper (typeorm modeling)
│   │       ├── enums
│   │       │     └── *.enum.ts # entity enum variables
│   │       └── subscribers
│   │             └── *.subscriber.ts # entity's lifecycle events
│   │
│   ├── aws # AWS libs (S3)
│   ├── encryption # Encryption library
│   ├── logger # File logger (logging to `logs` folder)
│   ├── utils # Common / Reusable code for different project
│   └── <**library>
│
├── logs
├── scripts # npm script | custom scripts
│
├── typeorm # typeorm migrations
│   ├── migrations
│   └── seeds
│
├── /configs
│
│
├── env
│   ├── .<app>.env # Monorepo env (not shared) Note: not work with
│   └── .env # Global env (Shared to all app)
│
├── .eslintrc.js # eslint config
├── .gitignore
├── .hygen.js # hygen (file generator) configs
├── .prettierrc # prettier config
├── .barrelsby.json
├── .nest-cli.json
├── package.json # dependencies
└── tsconfig.json # typescript config
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
