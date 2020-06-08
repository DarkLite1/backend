import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { HelloWorldResolver } from './resolvers/HelloWorldResolver'
import { MovieResolver } from './resolvers/MovieResolver'

export const getApolloServer = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, MovieResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  })
}