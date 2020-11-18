import { ENVIRONMENT } from '@environment'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { getUser } from '@utils/passport'
import { AccountResolver } from '@it-portal/resolver/AccountResolver'
import { PreferenceResolver } from '@it-portal/resolver/PreferenceResolver'
import { ViewerResolver } from '@it-portal/resolver/ViewerResolver'

import { RosterResolver } from '@sap-truck-roster/resolver/RosterResolver'
import { Roster } from '@sap-truck-roster/entity/Roster'
import { PlantResolver } from '@sap-truck-roster/resolver/PlantResolver'
import { Plant } from '@sap-truck-roster/entity/Plant'
import { Driver } from '@sap-truck-roster/entity/Driver'
import { DriverResolver } from '@sap-truck-roster/resolver/DriverResolver'

export const getSchema = async () => {
  return await buildSchema({
    validate: true,
    resolvers: [
      AccountResolver,
      PreferenceResolver,
      ViewerResolver,
      RosterResolver,
      PlantResolver,
      DriverResolver,
    ],
  })
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
        sapPlantApi: new Plant(),
        sapDriverApi: new Driver(),
      }
    },
    introspection: ENVIRONMENT.playground,
    playground: ENVIRONMENT.playground,
  })
}
