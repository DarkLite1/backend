import { ENVIRONMENT } from '@environment'
import ApolloClient from 'apollo-boost'
import fetch from 'cross-fetch'

export const client = new ApolloClient({
  uri: `http://localhost:${ENVIRONMENT.port}`,
  fetch,
  //   onError: (e) => {
  //     console.log('Failed creating ApolloClient: ', e)
  //   },
})
