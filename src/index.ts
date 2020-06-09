import 'reflect-metadata'
import { createConnections } from 'typeorm'
import { getApolloServer } from './apolloServer'
import { ENVIRONMENT } from './environment'
;(async () => {
  try {
    await createConnections()
  } catch (error) {
    console.log('Failed creating database connections: ', error)
  }

  try {
    const server = await getApolloServer()
    const response = await server.listen({ port: ENVIRONMENT.port })
    console.log(`Server ready at ${response.url}`)
  } catch (error) {
    console.log('Failed starting server: ', error)
  }
})()
