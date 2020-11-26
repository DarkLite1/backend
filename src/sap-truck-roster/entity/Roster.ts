import { Truck } from '@sap-truck-roster/entity/Truck'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Roster {
  // @Field(() => Truck)
  @Field(() => Truck, { nullable: true })
  truck: Truck

  @Field(() => ID)
  readonly truckId: string

  @Field(() => ID)
  readonly radioId: string

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
  readonly startPlantLoadingDateTime: string
}
