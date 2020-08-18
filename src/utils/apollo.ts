import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { AccountResolver } from '@resolvers/AccountResolver'
import { PreferenceResolver } from '@resolvers/PreferenceResolver'
import { ENVIRONMENT } from '@environment'

export const getSchema = async () => {
  return await buildSchema({
    // validate: false,
    validate: true,
    resolvers: [AccountResolver, PreferenceResolver],
  })
}

export const getApolloServer = async () => {
  return new ApolloServer({
    schema: await getSchema(),
    // context: ({ req, res }) => ({ req, res }),
    context: ({ req }) => ({
      getUser: () => req.user,
    }),
    introspection: ENVIRONMENT.mode !== 'production',
    // playground: ENVIRONMENT.mode !== 'production',
    playground: {
      endpoint: '/graphql/dev',
    },
  })
}
