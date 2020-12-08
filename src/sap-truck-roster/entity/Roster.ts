import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Roster {
  // @Field(() => Truck, { nullable: true })
  // truck?: Truck

  // @Field(() => Truck, { nullable: true })
  // get truck(): Truck | null {
  //   return // call API here with this.truckId ?
  // }

  @Field({ nullable: true })
  readonly truckId?: string

  @Field({ nullable: true })
  readonly radioId?: string

  @Field({ nullable: true })
  readonly driverId?: string

  @Field({ nullable: true })
  readonly driverFirstName?: string

  @Field({ nullable: true })
  readonly driverLastName?: string

  @Field({ nullable: true })
  readonly driverEmail?: string

  @Field({ nullable: true })
  readonly dispatchGroup?: string

  @Field({ nullable: true })
  readonly plantId?: string

  @Field({ nullable: true })
  readonly plantName?: string

  @Field({ nullable: true })
  readonly plantTimezone?: string

  @Field({ nullable: true })
  readonly plantStreetHouse?: string

  @Field({ nullable: true })
  readonly plantCountry?: string

  @Field({ nullable: true })
  readonly plantCity?: string

  @Field({ nullable: true })
  readonly startPlantLoadingDateTime?: string
}
