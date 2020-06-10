import { GlobalInterface } from '../Interfaces/global'

declare let global: GlobalInterface

module.exports = async () => {
  console.log('jest teardown')

  // await global.apolloServer.stop()
}
