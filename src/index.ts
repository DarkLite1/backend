import 'reflect-metadata'
import 'tsconfig-paths/register'
import express from 'express'
import { ENVIRONMENT } from '@environment'
import { createConnections } from 'typeorm'
import { getApolloServer } from '@utils/apollo'
import cors from 'cors'

const app = express()

const corsOptions = function (
  req: Express.Request,
  callback: CallableFunction
) {
  let corsOptions
  if (ENVIRONMENT.corsWhiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      allowedHeaders: ['authorization', 'content-type'],
    }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

// const corsOptionsDelegate = function (
//   req: Express.Request,
//   callback: CallableFunction
// ) {
//   let corsOptions
//   if (ENVIRONMENT.corsWhiteList.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = {
//       origin: true,
//       allowedHeaders: ['authorization', 'content-type'],
//     } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// app.options('*', cors(corsOptionsDelegate))
// app.use(
//   cors({ origin: true, allowedHeaders: ['authorization', 'content-type'] })
// )

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
