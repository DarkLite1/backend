import { ApolloServer } from 'apollo-server'

/// <reference types="node" />
export interface Global extends NodeJS.Global {
  document: Document
  window: Window
  apolloServer: ApolloServer
}
