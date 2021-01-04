import {
  Resolver,
  Arg,
  Query,
  Ctx,
  Field,
  ObjectType,
  createUnionType,
  FieldResolver,
  Root,
} from 'type-graphql'
import { Roster } from '@sap-truck-roster/entity/Roster'
import { plainToClass } from 'class-transformer'
import { Context } from '@shared/typings'
import { ApiError } from '@shared/graphql'
import { Truck } from '@sap-truck-roster/entity/Truck'

@ObjectType()
class RosterArray {
  @Field(() => [Roster], { nullable: true })
  data?: [Roster]
}

const RosterQueryResultUnion = createUnionType({
  name: 'RosterQueryResult',
  // types: () => [[Roster], ApiError] as const,
  // an array is not supported by the Graphql spec in unions
  types: () => [RosterArray, ApiError] as const,
})

@Resolver(() => Roster)
export class RosterResolver {
  @Query(() => RosterQueryResultUnion)
  async roster(
    @Ctx() ctx: Context,
    @Arg('date', { nullable: true }) date: Date,
    @Arg('fromDate', { nullable: true }) fromDate: Date,
    @Arg('driverId', { nullable: true }) driverId?: string,
    @Arg('radioId', { nullable: true }) radioId?: string,
    @Arg('dispatchGroup', { nullable: true }) dispatchGroup?: string,
    @Arg('truckId', { nullable: true }) truckId?: string
  ): Promise<typeof RosterQueryResultUnion> {
    try {
      const response = await ctx.dataSources.sapTruckRosterAPI.getRoster({
        date,
        fromDate,
        driverId,
        radioId,
        truckId,
        dispatchGroup,
      })

      if (response.returnCode === 'OK') {
        return plainToClass(RosterArray, {
          data: response.data,
        })
      }
      return plainToClass(ApiError, {
        code: response.returnCode,
        message: response.errorMessage,
      })
    } catch (error) {
      return plainToClass(ApiError, {
        code: 'SAP API failure',
        message: `${error}`,
      })
    }
  }

  @FieldResolver(() => Truck, { nullable: true })
  async truck(@Root() roster: Roster, @Ctx() ctx: Context) {
    console.log('roster.truckId: ', roster.truckId)

    const response = await ctx.dataSources.sapTruckRosterAPI.getTruck({
      id: roster.truckId,
    })

    console.log('response: ', response)

    return response
  }
}
