import { ENVIRONMENT } from '@environment'
import { getBasicAuthString } from '@utils/helpers'
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { Field, ID, ObjectType } from 'type-graphql'

const sapTruckRosterBasicAuthString = getBasicAuthString(
  ENVIRONMENT.sapTruckRoster.username!,
  ENVIRONMENT.sapTruckRoster.password!
)

@ObjectType()
export class Roster extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = ENVIRONMENT.sapTruckRoster.Url
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', sapTruckRosterBasicAuthString)
  }

  async getRoster({
    date,
    driverId = '',
    truckId = '',
  }: {
    date: string
    driverId?: string
    truckId?: string
  }) {
    return await this.get(
      `/roster/?date=${date}&driverId=${driverId}&truckId=${truckId}`
    )
  }

  @Field(() => ID)
  readonly truckId: string

  @Field(() => ID)
  readonly driverId: string

  @Field()
  readonly driverFirstName: string

  @Field()
  readonly driverLastName: string

  @Field()
  readonly driverEmail: string

  @Field()
  readonly despatchGroup: string

  @Field(() => ID)
  readonly plantId: string

  @Field()
  readonly plantName: string

  @Field()
  readonly plantTimezone: string

  @Field()
  readonly plantStreetHouse: string

  @Field()
  readonly plantCountry: string

  @Field()
  readonly plantCity: string

  @Field()
  readonly startPlantLoadingDateTime: Date
}
