import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { AccountResolver } from '@resolvers/AccountResolver'

export const getSchema = async () => {
  return await buildSchema({
    // validate: false,
    validate: true,
    resolvers: [AccountResolver],
  })
}

export const getApolloServer = async () => {
  return new ApolloServer({
    schema: await getSchema(),
    context: ({ req, res }) => ({ req, res }),
  })
}
