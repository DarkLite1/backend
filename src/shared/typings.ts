import { Roster } from '@sap-truck-roster/entity/Roster'
import { Account } from '@it-portal/entity/Account'
import { Plant } from '@sap-truck-roster/entity/Plant'
import { Driver } from '@sap-truck-roster/entity/Driver'

export interface Context {
  user: Account
  dataSources: {
    sapRosterApi: Roster
    sapPlantApi: Plant
    sapDriverApi: Driver
  }
}
