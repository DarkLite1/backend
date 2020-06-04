import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloWorldResolver } from './resolvers/HelloWorldResolver'
import { MovieResolver } from './resolvers/MovieResolver'
import { ENVIRONMENT } from './environment'
;(async () => {
  const app = express()

  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, MovieResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(ENVIRONMENT.port, ENVIRONMENT.host, (err) => {
    if (err) {
      console.log(err)
      return
    }

    console.log(`Listening at http://${ENVIRONMENT.host}:${ENVIRONMENT.port}`)
  })
})()
