export const ENVIRONMENT = {
  mode: (() =>
    process.env.mode === 'production' ? 'production' : 'development')(),
  port: process.env.PORT || 4000,
  database: {
    'it-portal': {
      host: process.env.DB_IT_PORTAL_HOST,
      name: process.env.DB_IT_PORTAL_NAME,
      username: process.env.DB_IT_PORTAL_USERNAME,
      password: process.env.DB_IT_PORTAL_PASSWORD,
    },
  },
}

console.dir(ENVIRONMENT)
