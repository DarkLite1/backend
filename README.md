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

After making a single database change
```bash
npm run typeorm-migration-generate
```
