import { ENVIRONMENT } from '@environment'
import { getBasicAuthString } from '@utils/helpers'
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { Field, ID, ObjectType } from 'type-graphql'

const sapTruckRosterBasicAuthString = getBasicAuthString(
  ENVIRONMENT.sapTruckRoster.username!,
  ENVIRONMENT.sapTruckRoster.password!
)

@ObjectType()
export class Truck extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = ENVIRONMENT.sapTruckRoster.Url
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', sapTruckRosterBasicAuthString)
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

  @Field(() => ID)
  readonly id: string

  @Field()
  readonly category: string

  @Field()
  readonly status: string

  @Field()
  readonly country: string

  @Field()
  readonly description: string

  @Field()
  readonly fleetNr: string

  @Field()
  readonly resourceId: string

  @Field()
  readonly maxLegalWeight: string

  @Field()
  readonly maxCapacity: string

  @Field()
  readonly maxPumpCapacity: string

  @Field()
  readonly ownershipId: string

  @Field()
  readonly tareDate: string

  @Field()
  readonly tareTime: string

  @Field()
  readonly tareWeight: string

  @Field()
  readonly minLoadSize: string

  @Field()
  readonly emptySpeed: string

  @Field()
  readonly speedUnit: string

  @Field()
  readonly loadedSpeed: string

  @Field()
  readonly haulerVendorId: string
}
