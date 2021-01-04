import {
  Resolver,
  Arg,
  Query,
  Ctx,
  Field,
  ObjectType,
  createUnionType,
} from 'type-graphql'
import { Plant } from '@sap-truck-roster/entity/Plant'
import { plainToClass } from 'class-transformer'
import { Context } from '@shared/typings'
import { ApiError } from '@shared/graphql'

@ObjectType()
class PlantArray {
  @Field(() => [Plant], { nullable: true })
  data?: [Plant]
}

const PlantQueryResultUnion = createUnionType({
  name: 'PlantQueryResult',
  // types: () => [[Plant], ApiError] as const,
  // an array is not supported by the Graphql spec in unions
  types: () => [PlantArray, ApiError] as const,
})

@Resolver(() => Plant)
export class PlantResolver {
  @Query(() => PlantQueryResultUnion)
  async plant(
    @Ctx() ctx: Context,
    @Arg('id', { nullable: true }) id?: string,
    @Arg('country', { nullable: true }) country?: string
  ): Promise<typeof PlantQueryResultUnion> {
    try {
      const response = await ctx.dataSources.sapTruckRosterAPI.getPlant({
        country,
        id,
      })

      if (response.returnCode === 'OK') {
        return plainToClass(PlantArray, {
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
