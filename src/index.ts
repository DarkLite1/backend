import 'reflect-metadata'
import 'tsconfig-paths/register'
import express from 'express'
import { ENVIRONMENT } from '@environment'
import { createConnections } from 'typeorm'
import { getApolloServer } from '@utils/apollo'
import cors, { CorsOptions } from 'cors'

const app = express()

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (
      ENVIRONMENT.corsWhiteList.indexOf(origin as string) !== -1 ||
      // allow API calls in dev from Graphql Playground
      (!origin && ENVIRONMENT.playground) 
    ) {
      callback(null, true)
    } else {
      callback(
        new Error(`Request from '${origin}' is not allowed by CORS, please update the CORS_WHITELIST`)
      )
    }
  },
}

app.use(cors(corsOptions))
;(async () => {
  try {
    try {
      await createConnections()
    } catch (error) {
      throw `Failed creating database connections: ${error}`
    }

    const server = await getApolloServer()
    server.applyMiddleware({ app, cors: false })

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
