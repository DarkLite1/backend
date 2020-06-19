import 'reflect-metadata'
import { ENVIRONMENT } from './environment'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnections } from 'typeorm'

import { AccountResolver } from './resolvers/AccountResolver'
;(async () => {
  try {
    await createConnections()
  } catch (error) {
    console.log('Failed creating database connections: ', error)
  }

  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        validate: false,
        resolvers: [AccountResolver],
      }),
      context: ({ req, res }) => ({ req, res }),
    })

    const response = await server.listen({ port: ENVIRONMENT.port })
    console.log(`Server ready at ${response.url}`)
  } catch (error) {
    console.log('Failed starting server: ', error)
  }
})()
