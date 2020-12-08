import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Plant {
  @Field({ nullable: true })
  readonly id?: string

  @Field({ nullable: true })
  readonly name?: string

  @Field({ nullable: true })
  readonly customerNrPlant?: string

  @Field({ nullable: true })
  readonly vendorNrPlant?: string

  @Field({ nullable: true })
  readonly factoryCalendar?: string

  @Field({ nullable: true })
  readonly streetHouse?: string

  @Field({ nullable: true })
  readonly country?: string

  @Field({ nullable: true })
  readonly postCode?: string

  @Field({ nullable: true })
  readonly city?: string

  @Field({ nullable: true })
  readonly purchasingOrg?: string

  @Field({ nullable: true })
  readonly region?: string
}
