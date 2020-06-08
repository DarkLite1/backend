import { getApolloServer } from '../../src/apolloServer'

module.exports = async () => {
  console.log('jest setup')

  global.apolloServer = await getApolloServer()

  global.apolloServer.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}
