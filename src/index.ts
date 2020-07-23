import 'reflect-metadata'
import 'tsconfig-paths/register'
import express from 'express'
import passport from 'passport'
import { BearerStrategy } from 'passport-azure-ad'
import { ENVIRONMENT } from '@environment'
import { createConnections } from 'typeorm'
import { getApolloServer } from '@utils/apollo'
import cors from 'cors'

const app = express()

const bearerStrategy = new BearerStrategy(
  {
    identityMetadata:
      'https://login.microsoftonline.com/57952406-af28-43c8-b4de-a4e06f57476d/v2.0/.well-known/openid-configuration',
    clientID: '0e01a2d8-64bb-4c3b-a75d-939aa5d8d361',
    validateIssuer: false,
    loggingLevel: 'info',
    passReqToCallback: false,
  },
  (token, done) => {
    // Send user info using the second argument
    done(null, {}, token)
  }
)
app.use(cors({ origin: true }))
app.use(passport.initialize())
passport.use(bearerStrategy)

app.use(
  passport.authenticate('oauth-bearer', { session: false }),
  (req, res, next) => {
    console.log('User info: ', req.user)
    console.log('Validated claims: ', req.authInfo)

    // if (req.authInfo['scp'].split(' ').indexOf('demo.read') >= 0) {
    //   // Service relies on the name claim.
    //   res.status(200).json({
    //     'request-for': 'access_token',
    //     'requested-by': req.authInfo['name'],
    //     'issued-by': req.authInfo['iss'],
    //     'issued-for': req.authInfo['aud'],
    //     scope: req.authInfo['scp'],
    //   })
    //   // next()
    // } else {
    //   console.log('Invalid Scope, 403')
    //   res.status(403).json({ error: 'insufficient_scope' })
    // }
    next()
  }
)
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
