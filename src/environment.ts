import { stripTrailingSlash } from '@utils/helpers'

export const ENVIRONMENT = {
  mode:
    process.env.mode === 'production' || process.env.NODE_ENV === 'production'
      ? 'production'
      : 'development',
  port: process.env.PORT || 4000,
  playground: process.env.PLAYGROUND === 'true',
  database: {
    'it-portal': {
      host: process.env.DB_IT_PORTAL_HOST,
      name: process.env.DB_IT_PORTAL_NAME,
      username: process.env.DB_IT_PORTAL_USERNAME,
      password: process.env.DB_IT_PORTAL_PASSWORD,
    },
  },
  sapTruckRoster: {
    Url: process.env.SAP_REST_API_TRUCK_ROSTER_URL
      ? stripTrailingSlash(process.env.SAP_REST_API_TRUCK_ROSTER_URL)
      : '',
    username: process.env.SAP_REST_API_TRUCK_ROSTER_USERNAME,
    password: process.env.SAP_REST_API_TRUCK_ROSTER_PASSWORD,
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
