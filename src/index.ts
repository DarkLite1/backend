import 'reflect-metadata'
import express from 'express'
import { createConnections } from 'typeorm'
import { ENVIRONMENT } from './environment'
import { getApolloServer } from './apolloServer'
;(async () => {
  const app = express()

  console.log('secret: ', process.env.SECRET);
  

  await createConnections()
  ;(await getApolloServer()).applyMiddleware({ app, cors: false })

  app
    .listen({ port: ENVIRONMENT.port, host: ENVIRONMENT.host }, () => {
      console.log(
        `Server ready at http://${ENVIRONMENT.host}:${ENVIRONMENT.port}/graphql`
      )
    })
    .on('error', function (error) {
      console.log(`Failed starting server: ${error}`)
    })
})()
