// import 'reflect-metadata'
// import { getApolloServer } from '../../src/server/apolloServer'
import { GlobalInterface } from '../Interfaces/global'
// import { ENVIRONMENT } from '../../src/environment'
// import { isUrlOnline } from '../utils/axiosHelpers'
// import axios from 'axios'

declare let global: GlobalInterface

module.exports = async () => {
  console.log('jest setup')

  // const isUrlOnline = async (url: string) => {
  //   try {
  //     await axios.head(url)
  //     return true
  //   } catch (error) {
  //     console.log('error axios: ', error);
      
  //     return false
  //     // if (error.response.status >= 400) {
  //     // }
  //   }
  // }

  // // const uri = 'http://locat:5000/'
  // const uri = 'http://localhost:5050/'
  // // const uri = 'http://localhost:5000/'
  // const isOnline = await isUrlOnline(uri)
  // console.log(isOnline);
  
  // if (!isOnline) {
  //   throw new Error(`Apollo server is not running on ${uri}`)
  // }

  // try {
  //   global.apolloServer = await getApolloServer()
  //   const response = await global.apolloServer.listen({
  //     port: ENVIRONMENT.port,
  //   })
  //   console.log(`Server ready at ${response.url}`)
  // } catch (error) {
  //   console.log('Failed starting server: ', error)
  // }

  // global.apolloServer.listen().then(({ url }) => {
  //   console.log(`Server ready at ${url}`)
  // })
}
