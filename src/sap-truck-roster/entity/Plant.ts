import { ENVIRONMENT } from '@environment'
import { getBasicAuthString } from '@utils/helpers'
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { Field, ID, ObjectType } from 'type-graphql'

const sapTruckRosterBasicAuthString = getBasicAuthString(
  ENVIRONMENT.sapTruckRoster.username!,
  ENVIRONMENT.sapTruckRoster.password!
)

@ObjectType()
export class Plant extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = ENVIRONMENT.sapTruckRoster.Url
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', sapTruckRosterBasicAuthString)
  }

  async getPlant({
    id = '',
    country = '',
  }: { id?: string; country?: string } = {}) {
    return await this.get(`/plant?country=${country}&id=${id}`)
  }

  @Field(() => ID)
  readonly id: string

  @Field()
  readonly name: string

  @Field()
  readonly customerNrPlant: string

  @Field()
  readonly vendorNrPlant: string

  @Field()
  readonly factoryCalendar: string

  @Field()
  readonly streetHouse: string

  @Field()
  readonly country: string

  @Field()
  readonly postCode: string

  @Field()
  readonly city: string

  @Field()
  readonly purchasingOrg: string

  @Field()
  readonly region: string
}
