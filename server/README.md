## Description

API Service.

## Installation

```bash
# Configure environment variables for development
$ cp .env.example .env.development.local
# Configure environment variables for tests
$ cp .env.example .env.test.local
# Install packages
$ npm install
```

## Migrations

Create 2 databases for multitenancy manually. You can see names in .env.example file.
Alternatively you can create only 1 DB and use only 1 object in TENANTS variable

To run database migrations, you can use the following command:

```bash
# run migrations
$ npm run migrate
```

To create database migrations, you can use the following command:

```bash
# run migrations
$ npm run typeorm migration:create ./src/migrations/<migration_name>
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Application Structure

```
src/                                      # Source code
├── config/                               # Environment configuration files
│   └── database.config.ts                # Database configuration file
├── features/                             # Domains source code
│   ├── session-templates/                # Session Templates domain source code
│   └── engagements/                      # Engagements domain source code
├── initializers/                         # Initializers source code
│   ├── config.initializer.ts             # NestJS Config initializer
│   ├── graphql.initializer.ts            # GraphQL initializer
│   ├── initializers.module.ts            # Initializers mudule
│   └── typeort.initializer.ts            # TypeORM initializer
├── tests/                                # Constants basic helpers / managers for tests
│   └── integration-tests-manager.ts      # Integration tests configuration manager
├── app.module.ts                         # Application module
├── main.ts                               # Application entry file
└── schema.gql                            # Genarated GraphQL schema
.eslintrc.js                              # ESLint configuration
.gitignore                                # Git ignore file
.prettierrc                               # Prettier configuration
.env.example                              # Environment configuration example
nest-cli.json                             # Nest CLI configuration
package.json                              # Package configuration
README.md                                 # Readme file
tsconfig.build.json                       # TypeScript build configuration
tsconfig.json                             # TypeScript configuration
```
