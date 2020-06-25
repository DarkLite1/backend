import 'reflect-metadata'
import 'tsconfig-paths/register'
import { ENVIRONMENT } from '@environment'
import { createConnections } from 'typeorm'
import { getApolloServer } from '@utils/apollo'

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
