import {
  Resolver,
  Arg,
  Query,
  Ctx,
  Field,
  ObjectType,
  createUnionType,
} from 'type-graphql'
import { Roster } from '@sap-truck-roster/entity/Roster'
import { plainToClass } from 'class-transformer'
import { Context } from '@shared/typings'
import { ApiError } from '@shared/graphql'

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
    @Arg('date', () => String) date: string,
    @Arg('truckId', { nullable: true }) truckId?: string,
    @Arg('driverId', { nullable: true }) driverId?: string
  ): Promise<typeof RosterQueryResultUnion> {
    try {
      const response = await ctx.dataSources.sapRosterApi.getRoster({
        date,
        driverId,
        truckId,
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
        code: 'API internal failure',
        message: `The API request failed: ${error}`,
      })
    }
  }
}
