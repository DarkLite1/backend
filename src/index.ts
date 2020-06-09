import 'reflect-metadata'
import { createConnections } from 'typeorm'
import { getApolloServer } from './apolloServer'
import { ENVIRONMENT } from './environment'

;(async () => {
  await createConnections()

  const server = await getApolloServer()

  try {
    const response = await server.listen({ port: ENVIRONMENT.port })
    console.log(`Server ready at ${response.url}`)
  } catch (error) {
    console.log('Failed starting server: ', error)
  }
})()
