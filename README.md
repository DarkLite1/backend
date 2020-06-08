# Backend

Backend server that can be used with Graphql queries and mutations to consume the exposed services (API's, databases, ...).

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run dev
```

### Start the app for production
```bash
npm run start
```

### Handle database changes

When adding, removing or modifying fields or tables in the code this needs to be reflected in the database too. For every single change made to a database with the ormconfig set to `"synchronize": false` follow the steps below.

## Commit a change to the database

After making a single change to the database structure create a migration file for it:

```bash
npm run typeorm-migration-generate
```
Then apply the changes in the migration file to the database:

```bash
npm run typeorm-migration-run
```

Removing the migration file it not required, It will not be applied again on a next run.

## Revert a change in the database

Revert the last executed migration:

```bash
npm run typeorm-migration-revert
```

## List migrations

Show all migrations and whether they have been run or not

```bash
npm run typeorm-migration-show
```