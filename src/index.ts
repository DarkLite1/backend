import 'reflect-metadata'
import { ENVIRONMENT } from './environment'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnections } from 'typeorm'

import { HelloWorldResolver } from './resolvers/HelloWorldResolver'
import { MovieResolver } from './resolvers/MovieResolver'

;(async () => {
  try {
    await createConnections()
  } catch (error) {
    console.log('Failed creating database connections: ', error)
  }

  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloWorldResolver, MovieResolver],
      }),
      context: ({ req, res }) => ({ req, res }),
    })

    const response = await server.listen({ port: ENVIRONMENT.port })
    console.log(`Server ready at ${response.url}`)
  } catch (error) {
    console.log('Failed starting server: ', error)
  }
})()
