import { ApolloServer } from 'apollo-server'

export interface GlobalInterface extends NodeJS.Global {
  document: Document
  window: Window
  apolloServer: ApolloServer
}
