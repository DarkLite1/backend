import { Roster } from '@sap-truck-roster/entity/Roster'
import { Account } from '@it-portal/entity/Account'

export interface Context {
  user: Account
  dataSources: {
    sapRosterApi: Roster
  }
}

