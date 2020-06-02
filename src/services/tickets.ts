import { ApolloServer, gql } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'

import { environment } from '../environment'

const typeDefs = gql`
  extend type Query {
    topProducts(first: Int = 5): [Product]
  }

  type Product @key(fields: "upc") {
    upc: String!
    name: String
    price: Int
    weight: Int
  }
`

const resolvers = {
  Product: {
    __resolveReference(object) {
      return products.find((product) => product.upc === object.upc)
    },
  },
  Query: {
    topProducts(_, args) {
      return products.slice(0, args.first)
    },
  },
}

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
})

server
  .listen({ port: environment.port.tickets })
  .then(({ url }) => console.log(`Server ready at ${url}`))
  .catch((error) => console.log(`Failed to start server: ${error}`))

const products = [
  {
    upc: '1',
    name: 'Table',
    price: 899,
    weight: 100,
  },
  {
    upc: '2',
    name: 'Couch',
    price: 1299,
    weight: 1000,
  },
  {
    upc: '3',
    name: 'Chair',
    price: 54,
    weight: 50,
  },
]
