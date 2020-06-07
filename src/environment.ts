export const ENVIRONMENT = {
  mode: (() =>
    process.env.mode === 'production' ? 'production' : 'development')(),
  port: process.env.PORT || 4000,
  host: 'localhost',
}

console.log('mode: ', ENVIRONMENT.mode)
