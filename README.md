# Backend

This is a backend server that can be used with Graphql queries and mutations to consume the exposed services (API's, databases, ...). It is intended to be the single backend gateway that can be used with multiple frontends.

## Setup

### Install the dependencies
```bash
yarn
```

## Different modes

### Start the app in development mode

Connect to the test database and run the graphql server in development mode.

```bash
yarn dev
```

### Start the app for production

Start the application in production mode. This will read the environment variables and use them to start up the graphql server on the correct port and the connections to the production databases.

```bash
yarn start
```

## Running tests

### Run the test suite

Run end-to-end tests against the graphql endpoints, aka resolvers. These tests will use the test database and directly consume the Graphql schema without the need to start a test server.

```bash
yarn test
```

## Handle database changes

When working in development mode with `yarn dev` changes to the database structure might be required. Every change to the database schema within the code needs to be applied to the database as well. 

As a first step, changes are applied to the test database only (step 1 & 2). When they seem to be correct they can then be applied to the production database (step 3).

It is best practice to run the procedure below for every single change to the database (i.e. rename a column, add a table, ...). This will create a migration file for each change and allows an easy rollback process. Do not delete the migration files afterwards as they can be used to rebuild a complete database when needed.

### Update the databases

1. Generate a migration file with the name of the change

    ```bash
    yarn typeorm-migration-generate -- --n="removeColumnTitle"
    ```

2. Apply the changes to the test database

   ```bash
   yarn typeorm-migration-run
   ```

3. Apply the changes to the production database

   ```bash
   yarn typeorm-migration-run-prod
   ```

### Other database actions

- Revert the last executed migration:

```bash
yarn typeorm-migration-revert
```

- Show all migrations and whether they have been run or not

```bash
yarn typeorm-migration-show
```