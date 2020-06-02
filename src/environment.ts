const defaultValue = {
  port: {
    gateway: 4000,
    accounts: 4001,
    tickets: 4002,
  },
}

interface Environment {
  apollo: {
    introspection: boolean
    playground: boolean
  }
  port: {
    [key: string]: number | string
  }
}

const ports = Object.fromEntries(
  Object.entries(defaultValue.port).map(([key, value]) => {
    return [key, process.env[key] || value]
  })
)

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  port: ports,
}
