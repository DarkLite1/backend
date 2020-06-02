import { ApolloServer } from 'apollo-server'
import { ApolloGateway } from '@apollo/gateway'

import { environment } from './environment'

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: `http://localhost:${environment.port.accounts}` },
  ],
})

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
})

server
  .listen({ port: environment.port.gateway })
  .then(({ url }) => console.log(`Server ready at ${url}`))
  .catch((error) => console.log(`Failed to start server: ${error}`))

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.stop())
}
