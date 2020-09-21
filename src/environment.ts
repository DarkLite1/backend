export const ENVIRONMENT = {
  mode: process.env.mode === 'production' ? 'production' : 'development',
  port: process.env.PORT || 4000,
  database: {
    'it-portal': {
      host: process.env.DB_IT_PORTAL_HOST,
      name: process.env.DB_IT_PORTAL_NAME,
      username: process.env.DB_IT_PORTAL_USERNAME,
      password: process.env.DB_IT_PORTAL_PASSWORD,
    },
  },
  azure: {
    clientID: process.env.AZURE_CLIENT_ID || '',
    identityMetadata: process.env.AZURE_IDENTITY_METADATA || '',
  },
  corsWhiteList:
    typeof process.env.CORS_WHITELIST !== 'undefined'
      ? process.env.CORS_WHITELIST.split(',').map((item) => item.trim())
      : [],
}

// console.dir(ENVIRONMENT)
