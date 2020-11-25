import { ENVIRONMENT } from '@environment'
import { getBasicAuthString } from '@utils/helpers'
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { Field, ObjectType } from 'type-graphql'

const sapTruckRosterBasicAuthString = getBasicAuthString(
  ENVIRONMENT.sapTruckRoster.username!,
  ENVIRONMENT.sapTruckRoster.password!
)

@ObjectType()
export class RosterDispatchGroup extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = ENVIRONMENT.sapTruckRoster.Url
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', sapTruckRosterBasicAuthString)
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

  @Field()
  readonly date: Date

  @Field(() => [String])
  readonly dispatchGroup: string[]
}
