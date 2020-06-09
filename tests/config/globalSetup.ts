import { getApolloServer } from '../../src/apolloServer'
import { GlobalInterface } from '../Interfaces/global'

declare let global: GlobalInterface

module.exports = async () => {
  console.log('jest setup')

  global.apolloServer = await getApolloServer()

  global.apolloServer.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}
