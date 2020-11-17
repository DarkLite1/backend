import { ENVIRONMENT } from '@environment'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { getUser } from '@utils/passport'
import { AccountResolver } from '@it-portal/resolver/AccountResolver'
import { PreferenceResolver } from '@it-portal/resolver/PreferenceResolver'
import { ViewerResolver } from '@it-portal/resolver/ViewerResolver'
import { RosterResolver } from '@sap-truck-roster/resolver/RosterResolver'
import { Roster } from '@sap-truck-roster/entity/Roster'

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
