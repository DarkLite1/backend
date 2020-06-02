import { ApolloServer, gql } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'

import { environment } from '../environment'

interface UserInterface {
  id: string
  name: string
  username: string
  birthDate: string
}

const typeDefs = gql`
  # type Query {
  #   _: Boolean
  # }.

  # extend type Query {
  #   me: User
  # }
  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
  }
`

const resolvers = {
  Query: {
    me() {
      return users[0]
    },
  },
  User: {
    __resolveReference(object: UserInterface) {
      return users.find((user) => user.id === object.id)
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
  .listen({ port: environment.port.accounts })
  .then(({ url }) => console.log(`Server ready at ${url}`))
  .catch((error) => console.log(`Failed to start server: ${error}`))

const users: UserInterface[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    birthDate: '1815-12-10',
    username: '@ada',
  },
  {
    id: '2',
    name: 'Alan Turing',
    birthDate: '1912-06-23',
    username: '@complete',
  },
]
