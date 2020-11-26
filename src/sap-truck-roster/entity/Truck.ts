import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Truck {
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
