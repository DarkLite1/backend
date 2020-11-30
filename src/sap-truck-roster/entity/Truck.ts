import { Field, Float, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Truck {
  @Field({ nullable: true })
  readonly id?: string
  // @Field(() => ID)
  // readonly id: string

  @Field({ nullable: true })
  readonly radioId?: string

  @Field({ nullable: true })
  readonly country?: string

  @Field({ nullable: true })
  readonly fleetNr?: string

  @Field(() => Float, { nullable: true })
  readonly maxLegalWeight?: number

  @Field(() => Float, { nullable: true })
  readonly maxCapacity?: number

  @Field(() => Float, { nullable: true })
  readonly maxPumpCapacity?: number

  @Field({ nullable: true })
  readonly tareDate?: string

  @Field({ nullable: true })
  readonly tareTime?: string

  @Field(() => Float, { nullable: true })
  readonly tareWeight?: number

  @Field(() => Float, { nullable: true })
  readonly minLoadSize?: number

  @Field(() => Float, { nullable: true })
  readonly emptySpeed?: number

  @Field({ nullable: true })
  readonly speedUnit?: string

  @Field(() => Float, { nullable: true })
  readonly loadedSpeed?: number

  @Field({ nullable: true })
  readonly haulerVendorId?: string
}
