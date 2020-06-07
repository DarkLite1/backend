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

### Generate migrations for database changes

After making a single change to the database structure create a migration file for it:

```bash
npm run typeorm-migration-generate
```
Then apply the changes in the migration file:

```bash
npm run typeorm-migration-run
```

Removing the migration file it not required, It will not be applied again on a next run.