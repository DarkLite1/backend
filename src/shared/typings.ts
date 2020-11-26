import { Account } from '@it-portal/entity/Account'
import { sapTruckRosterAPI } from '@sap-truck-roster/data-source/sapTruckRosterAPI'

export interface Context {
  user: Account
  dataSources: {
    sapTruckRosterAPI: sapTruckRosterAPI
  }
}
