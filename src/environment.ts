export const ENVIRONMENT = {
  mode: (() =>
    process.env.mode === 'production' ? 'production' : 'development')(),
  port: process.env.PORT || 4000,
}

console.log('mode: ', ENVIRONMENT.mode)
