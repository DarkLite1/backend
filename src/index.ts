import 'reflect-metadata'
import 'tsconfig-paths/register'
import { ENVIRONMENT } from '@environment'
import { createConnections } from 'typeorm'
import { getApolloServer } from '@utils/apollo'

;(async () => {
  try {
    await createConnections()
  } catch (error) {
    console.error(`Failed creating database connections: ${error}`)
    process.exit(1)
  }

  try {
    const server = await getApolloServer()
    const response = await server.listen({ port: ENVIRONMENT.port })
    console.log(`Server ready at ${response.url}`)
  } catch (error) {
    console.error(`Failed starting server: ${error}`)
    process.exit(1)
  }
})()
