import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Plant {
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
