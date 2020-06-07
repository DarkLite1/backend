import 'reflect-metadata'
import express from 'express'
import { createConnections } from 'typeorm'
// import { createConnection, Connection, createConnections } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloWorldResolver } from './resolvers/HelloWorldResolver'
import { MovieResolver } from './resolvers/MovieResolver'
import { ENVIRONMENT } from './environment'
// import connections from './config/ormconfig.json'

;(async () => {
  const app = express()

  console.log('start connection')

  await createConnections()

  // try {
  //   await createConnection({
  //     name: 'it-portal',
  //     host: 'GRPSDFRAN0049',
  //     username: 'itportaladmin',
  //     password: 'eQnG0xzbfKgPbdkf01xQ',
  //     type: 'mssql',
  //     database: 'IT-Portal',
  //     synchronize: false,
  //     logging: true,
  //     entities: ['src/it-portal/entity/**/*.ts'],
  //     migrations: ['src/it-portal/migration/**/*.ts'],
  //     subscribers: ['src/it-portal/subscriber/**/*.ts'],
  //     cli: {
  //       entitiesDir: 'src/it-portal/entity',
  //       migrationsDir: 'src/it-portal/migration',
  //       subscribersDir: 'src/it-portal/subscriber',
  //     },
  //   })
  //   console.log('connectionProd is ok')
  // } catch (error) {
  //   console.log('Failed connecting to connectionProd: ', error)
  // }

  // try {
  //   await createConnection({
  //     name: 'it-portal-test',
  //     host: 'GRPSDFRAN0049',
  //     username: 'itportaltestadmin',
  //     password: 'ySH56TFuAADpy7GCMA3L',
  //     type: 'mssql',
  //     database: 'IT-Portal-TEST',
  //     synchronize: true,
  //     logging: true,
  //     entities: ['src/entity/**/*.ts'],
  //     migrations: ['src/migration/**/*.ts'],
  //     subscribers: ['src/subscriber/**/*.ts'],
  //     cli: {
  //       entitiesDir: 'src/entity',
  //       migrationsDir: 'src/migration',
  //       subscribersDir: 'src/subscriber',
  //     },
  //   })
  //   console.log('connectionTest is ok')
  // } catch (error) {
  //   console.log('Fialed connecting to connectionTest: ', error)
  // }

  // if (ENVIRONMENT.mode === 'production') {
  // } else {
  //   // const secondConnection: Connection = await createConnection(
  //   //   'it-portal-connection-test'
  //   // )
  // }

  // await createConnection('it-portalDatabase')
  // await createConnection('default')

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, MovieResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

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
