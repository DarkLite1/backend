import {
  Resolver,
  Arg,
  Query,
  Ctx,
  Field,
  ObjectType,
  createUnionType,
} from 'type-graphql'
import { RosterDispatchGroup } from '@sap-truck-roster/entity/RosterDispatchGroup'
import { plainToClass } from 'class-transformer'
import { Context } from '@shared/typings'
import { ApiError } from '@shared/graphql'

@ObjectType()
class RosterDispatchGroupArray {
  @Field(() => [RosterDispatchGroup], { nullable: true })
  data?: [RosterDispatchGroup]
}

const RosterDispatchGroupQueryResultUnion = createUnionType({
  name: 'RosterDispatchGroupQueryResult',
  // types: () => [[RosterDispatchGroup], ApiError] as const,
  // an array is not supported by the Graphql spec in unions
  types: () => [RosterDispatchGroupArray, ApiError] as const,
})

@Resolver(() => RosterDispatchGroup)
export class RosterDispatchGroupResolver {
  @Query(() => RosterDispatchGroupQueryResultUnion)
  async rosterDispatchGroup(
    @Ctx() ctx: Context,
    @Arg('date', { nullable: true }) date?: Date,
    @Arg('fromDate', { nullable: true }) fromDate?: Date
  ): Promise<typeof RosterDispatchGroupQueryResultUnion> {
    try {
      const response = await ctx.dataSources.sapTruckRosterAPI.getRosterDispatchGroup(
        { date, fromDate }
      )

      if (response.returnCode === 'OK') {
        return plainToClass(RosterDispatchGroupArray, {
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
}
