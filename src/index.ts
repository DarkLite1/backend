import 'reflect-metadata'
import 'tsconfig-paths/register'
import express from 'express'
import passport from 'passport'
import { ENVIRONMENT } from '@environment'
import { createConnections } from 'typeorm'
import { getApolloServer } from '@utils/apollo'
import { bearerStrategy } from '@utils/passport'
import cors from 'cors'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true }))
app.use(passport.initialize())

passport.use(bearerStrategy)
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
