// interface Environment {
//   port: {
//     [key: string]: number | string
//   }
//   apollo: {
//     introspection: boolean
//     playground: boolean
//   }
// }

export const ENVIRONMENT: Environment = {
  port: process.env.PORT_GATEWAY || 4000,
  host: 'localhost'
  // },
  // apollo: {
  //   introspection: process.env.APOLLO_INTROSPECTION === 'true',
  //   playground: process.env.APOLLO_PLAYGROUND === 'true',
  // },
}
