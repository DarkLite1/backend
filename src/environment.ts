// interface Environment {
//   port: {
//     [key: string]: number | string
//   }
//   apollo: {
//     introspection: boolean
//     playground: boolean
//   }
// }

// export const ENVIRONMENT: Environment = {
  export const ENVIRONMENT = {
  port: process.env.PORT || 4000,
  host: 'localhost'
  // },
  // apollo: {
  //   introspection: process.env.APOLLO_INTROSPECTION === 'true',
  //   playground: process.env.APOLLO_PLAYGROUND === 'true',
  // },
}
