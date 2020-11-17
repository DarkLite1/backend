import { ENVIRONMENT } from '@environment'
import { getBasicAuthString } from '@utils/helpers'
import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import { Field, ID, ObjectType } from 'type-graphql'

const sapTruckRosterBasicAuthString = getBasicAuthString(
  ENVIRONMENT.sapTruckRoster.username!,
  ENVIRONMENT.sapTruckRoster.password!
)

@ObjectType()
export class Driver extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = ENVIRONMENT.sapTruckRoster.Url
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', sapTruckRosterBasicAuthString)
  }

  async getDriver(id = '', country = '') {
    return await this.get(`/driver?id=${id}&country=${country}`)
  }

   @Field(() => ID)
  readonly id: string

  @Field()
  readonly firstName: string

  @Field()
  readonly lastName: string

  @Field()
  readonly email: string

  @Field()
  readonly telephone: string

  @Field()
  readonly despatchGroup: string

  @Field()
  readonly country: string

  @Field()
  readonly postCode: string

  @Field()
  readonly city: string

  @Field()
  readonly streetHouse: string

  @Field()
  readonly additionalRefNr: string

  @Field()
  readonly specialProp: string

  @Field()
  readonly mainWorkPlant: string

  @Field()
  readonly createdOn: string
  
  @Field()
  readonly deletionFlag: string
}
