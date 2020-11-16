import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { AccountResolver } from '@resolvers/AccountResolver'
import { PreferenceResolver } from '@resolvers/PreferenceResolver'
import { ViewerResolver } from '@resolvers/ViewerResolver'
import { RosterResolver } from '@resolvers/SAP/RosterResolver'
import { getUser } from '@utils/passport'
import { ENVIRONMENT } from '@environment'
import { Roster } from '@it-portal/entity/SAP/Roster'

export const getSchema = async () => {
  return await buildSchema({
    validate: true,
    resolvers: [
      AccountResolver,
      PreferenceResolver,
      ViewerResolver,
      RosterResolver,
    ],
  })
}

const playgroundEnabled = ENVIRONMENT.mode !== 'production'

if (!playgroundEnabled) {
  console.log(
    'LOG: For security reasons the Playground is disabled in Production mode'
  )
}

const context = async ({
  req,
  res,
}: {
  req: Express.Request
  res: Express.Response
}) => {
  try {
    const user = await getUser(req, res)
    // console.log('User found', user)
    return {
      user,
    }
  } catch (error) {
    console.log('Failed creating the context: ', error)
    throw new AuthenticationError(error)
  }
}

export const getApolloServer = async () => {
  return new ApolloServer({
    schema: await getSchema(),
    context,
    dataSources: () => {
      return {
        sapRosterApi: new Roster(),
      }
    },
    introspection: playgroundEnabled,
    playground: playgroundEnabled,
  })
}
