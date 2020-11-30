import { ENVIRONMENT } from '@environment'
import { formatDate, getBasicAuthString } from '@utils/helpers'
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { URLSearchParams } from 'url'

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
    id,
    country,
    email,
    dispatchGroup,
  }: {
    id?: string
    country?: string
    email?: string
    dispatchGroup?: string
  } = {}) {
    const params = new URLSearchParams()
    if (id) params.append('id', id)
    if (country) params.append('country', country)
    if (email) params.append('email', email)
    if (dispatchGroup) params.append('dispatchGroup', dispatchGroup)

    return await this.get('/driver', params)
  }

  async getTruck({
    id,
    country,
    radioId,
  }: { id?: string; country?: string; radioId?: string } = {}) {
    const params = new URLSearchParams()
    if (id) params.append('id', id)
    if (country) params.append('country', country)
    if (radioId) params.append('radioId', radioId)

    return await this.get('/truck', params)
  }

  async getPlant({ id, country }: { id?: string; country?: string } = {}) {
    const params = new URLSearchParams()
    if (id) params.append('id', id)
    if (country) params.append('country', country)

    return await this.get('/plant', params)
  }

  async getRoster({
    date,
    fromDate,
    driverId,
    radioId,
    truckId,
    dispatchGroup,
  }: {
    date?: Date
    fromDate?: Date
    driverId?: string
    radioId?: string
    truckId?: string
    dispatchGroup?: string
  }) {
    const params = new URLSearchParams()
    if (date) params.append('date', formatDate(date))
    if (fromDate) params.append('fromDate', formatDate(fromDate))
    if (driverId) params.append('driverId', driverId)
    if (radioId) params.append('radioId', radioId)
    if (truckId) params.append('truckId', truckId)
    if (dispatchGroup) params.append('dispatchGroup', dispatchGroup)

    return await this.get('/roster', params)
  }

  async getRosterDispatchGroup({
    date,
    fromDate,
  }: {
    date?: Date
    fromDate?: Date
  }) {
    const params = new URLSearchParams()
    if (date) params.append('date', formatDate(date))
    if (fromDate) params.append('fromDate', formatDate(fromDate))

    return await this.get('/rosterDispatchGroup', params)
  }
}
