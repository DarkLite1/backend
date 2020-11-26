import {
  Resolver,
  Arg,
  Query,
  Ctx,
  Field,
  ObjectType,
  createUnionType,
} from 'type-graphql'
import { Truck } from '@sap-truck-roster/entity/Truck'
import { plainToClass } from 'class-transformer'
import { Context } from '@shared/typings'
import { ApiError } from '@shared/graphql'

@ObjectType()
class TruckArray {
  @Field(() => [Truck], { nullable: true })
  data?: [Truck]
}

const TruckQueryResultUnion = createUnionType({
  name: 'TruckQueryResult',
  // types: () => [[Truck], ApiError] as const,
  // an array is not supported by the Graphql spec in unions
  types: () => [TruckArray, ApiError] as const,
})

@Resolver()
export class TruckResolver {
  @Query(() => TruckQueryResultUnion)
  async truck(
    @Ctx() ctx: Context,
    @Arg('id', { nullable: true }) id?: string,
    @Arg('country', { nullable: true }) country?: string
  ): Promise<typeof TruckQueryResultUnion> {
    try {
      const response = await ctx.dataSources.sapTruckApi.getTruck({
        id,
        country,
      })

      if (response.returnCode === 'OK') {
        // console.log('response date: ', response.data)

        return plainToClass(TruckArray, {
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
