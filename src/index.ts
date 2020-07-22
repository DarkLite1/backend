import 'reflect-metadata'
import 'tsconfig-paths/register'
import express from 'express'
import { ENVIRONMENT } from '@environment'
import { createConnections } from 'typeorm'
import { getApolloServer } from '@utils/apollo'

const app = express()

;(async () => {
  try {
    try {
      await createConnections()
    } catch (error) {
      throw `Failed creating database connections: ${error}`
    }

    const server = await getApolloServer()
    server.applyMiddleware({ app })

    app
      .listen({ port: ENVIRONMENT.port }, () => {
        console.log(
          `Server ready at http://localhost:${ENVIRONMENT.port}${server.graphqlPath}`
        )
      })
      .on('error', function (error) {
        throw `Failed starting Express server on port ${ENVIRONMENT.port}: ${error}`
      })
  } catch (error) {
    console.error(`Failed starting server: ${error}`)
    process.exit(1)
  }
})()
