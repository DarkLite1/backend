import 'reflect-metadata'
import { createConnections } from 'typeorm'
import { ENVIRONMENT } from './environment'
import { getApolloServer } from './apolloServer'
;(async () => {
  await createConnections()

  const server = await getApolloServer()

  server.listen({ port: ENVIRONMENT.port }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
})()
