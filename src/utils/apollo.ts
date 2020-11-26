import { ENVIRONMENT } from '@environment'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { getUser } from '@utils/passport'
import { AccountResolver } from '@it-portal/resolver/AccountResolver'
import { PreferenceResolver } from '@it-portal/resolver/PreferenceResolver'
import { ViewerResolver } from '@it-portal/resolver/ViewerResolver'

import { RosterResolver } from '@sap-truck-roster/resolver/RosterResolver'
import { Roster } from '@sap-truck-roster/entity/Roster'
import { RosterDispatchGroupResolver } from '@sap-truck-roster/resolver/RosterDispatchGroupResolver'
import { RosterDispatchGroup } from '@sap-truck-roster/entity/RosterDispatchGroup'
import { PlantResolver } from '@sap-truck-roster/resolver/PlantResolver'
import { Plant } from '@sap-truck-roster/entity/Plant'
import { Driver } from '@sap-truck-roster/entity/Driver'
import { DriverResolver } from '@sap-truck-roster/resolver/DriverResolver'
import { TruckResolver } from '@sap-truck-roster/resolver/TruckResolver.'
import { Truck } from '@sap-truck-roster/entity/Truck'

export const getSchema = async () => {
  return await buildSchema({
    validate: true,
    resolvers: [
      AccountResolver,
      PreferenceResolver,
      ViewerResolver,
      RosterResolver,
      RosterDispatchGroupResolver,
      PlantResolver,
      DriverResolver,
      TruckResolver,
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
        sapRosterDispatchGroupApi: new RosterDispatchGroup(),
        sapPlantApi: new Plant(),
        sapDriverApi: new Driver(),
        sapTruckApi: new Truck(),
      }
    },
    introspection: ENVIRONMENT.playground,
    playground: ENVIRONMENT.playground,
  })
}
