import 'reflect-metadata'
import 'tsconfig-paths/register'
import express from 'express'
import { ENVIRONMENT } from '@environment'
import { createConnections } from 'typeorm'
import { getApolloServer } from '@utils/apollo'
import cors from 'cors'

const app = express()

const allowList = ['http://localhost:8080', 'https://hip.heidelbergcement.com']

const corsOptionsDelegate = function (
  req: Express.Request,
  callback: CallableFunction
) {
  let corsOptions
  if (allowList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      allowedHeaders: ['Authorization', 'content-type'],
    } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.options('*', cors(corsOptionsDelegate))
app.use(
  cors({ origin: true, allowedHeaders: ['Authorization', 'content-type'] })
)

// app.use((_, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
//   })

// app.use(
//   cors({
//     // origin: 'http://localhost:8080',
//     origin: ['http://localhost:8080', /\.heidelbergcement\.com$/],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   })
// )
// app.use(cors({ origin: true }))
// app.options('*', cors({origin: true}))
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
