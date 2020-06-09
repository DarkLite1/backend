import { getApolloServer } from '../../src/apolloServer'
import { GlobalInterface } from '../Interfaces/global'
import { ENVIRONMENT } from '../../src/environment'

declare let global: GlobalInterface

module.exports = async () => {
  console.log('jest setup')

  global.apolloServer = await getApolloServer()

  try {
    const response = await global.apolloServer.listen({
      port: ENVIRONMENT.port,
    })
    console.log(`Server ready at ${response.url}`)
  } catch (error) {
    console.log('Failed starting server: ', error)
  }

  // global.apolloServer.listen().then(({ url }) => {
  //   console.log(`Server ready at ${url}`)
  // })
}
