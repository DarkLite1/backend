import { ENVIRONMENT } from './src/environment'

export = [
  {
    name: 'default',
    host: ENVIRONMENT.database['it-portal'].host,
    database: ENVIRONMENT.database['it-portal'].name,
    username: ENVIRONMENT.database['it-portal'].username,
    password: ENVIRONMENT.database['it-portal'].password,
    type: 'mssql',
    synchronize: ENVIRONMENT.mode !== 'production',
    // dropSchema: ENVIRONMENT.mode !== 'production',
    logging: false,
    // logging: ENVIRONMENT.mode !== 'production',
    options: {
      enableArithAbort: true,
      trustServerCertificate: true,
    },
    entities: ['src/it-portal/entity/**/*.ts'],
    migrations: ['src/it-portal/migration/**/*.ts'],
    subscribers: ['src/it-portal/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/it-portal/entity',
      migrationsDir: 'src/it-portal/migration',
      subscribersDir: 'src/it-portal/subscriber',
    },
  },
]
