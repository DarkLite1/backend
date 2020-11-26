import { ENVIRONMENT } from '@environment'
import { getBasicAuthString } from '@utils/helpers'
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'

const sapTruckRosterBasicAuthString = getBasicAuthString(
  ENVIRONMENT.sapTruckRoster.username!,
  ENVIRONMENT.sapTruckRoster.password!
)

export class sapTruckRosterAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = ENVIRONMENT.sapTruckRoster.Url
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', sapTruckRosterBasicAuthString)
  }

  async getDriver({
    id = '',
    country = '',
  }: { id?: string; country?: string } = {}) {
    return await this.get(`/driver?id=${id}&country=${country}`)
  }

  async getTruck({
    id = '',
    country = '',
    radioId = '',
  }: { id?: string; country?: string; radioId?: string } = {}) {
    return await this.get(
      `/truck?id=${id}&country=${country}&radioId=${radioId}`
    )
  }

  async getPlant({
    id = '',
    country = '',
  }: { id?: string; country?: string } = {}) {
    return await this.get(`/plant?country=${country}&id=${id}`)
  }

  async getRoster({
    date = '',
    fromDate = '',
    driverId = '',
    radioId = '',
    truckId = '',
  }: {
    date?: string
    fromDate?: string
    driverId?: string
    radioId?: string
    truckId?: string
  }) {
    return await this.get(
      `/roster/?date=${date}&fromDate=${fromDate}&driverId=${driverId}&truckId=${truckId}&radioId=${radioId}`
    )
  }

  async getRosterDispatchGroup({
    date = '',
    fromDate = '',
  }: {
    date?: string
    fromDate?: string
  }) {
    return await this.get(
      `/rosterDispatchGroup/?date=${date}&fromDate=${fromDate}`
    )
  }
}
