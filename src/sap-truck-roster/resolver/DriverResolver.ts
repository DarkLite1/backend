import {
  Resolver,
  Arg,
  Query,
  Ctx,
  Field,
  ObjectType,
  createUnionType,
} from 'type-graphql'
import { Driver } from '@sap-truck-roster/entity/Driver'
import { plainToClass } from 'class-transformer'
import { Context } from '@shared/typings'
import { ApiError } from '@shared/graphql'

@ObjectType()
class DriverArray {
  @Field(() => [Driver], { nullable: true })
  data?: [Driver]
}

const DriverQueryResultUnion = createUnionType({
  name: 'DriverQueryResult',
  // types: () => [[Driver], ApiError] as const,
  // an array is not supported by the Graphql spec in unions
  types: () => [DriverArray, ApiError] as const,
})

@Resolver(() => Driver)
export class DriverResolver {
  @Query(() => DriverQueryResultUnion)
  async driver(
    @Ctx() ctx: Context,
    @Arg('id', { nullable: true }) id?: string,
    @Arg('country', { nullable: true }) country?: string,
    @Arg('dispatchGroup', { nullable: true }) dispatchGroup?: string,
    @Arg('email', { nullable: true }) email?: string
  ): Promise<typeof DriverQueryResultUnion> {
    try {
      const response = await ctx.dataSources.sapTruckRosterAPI.getDriver({
        id,
        country,
        email,
        dispatchGroup,
      })

      if (response.returnCode === 'OK') {
        return plainToClass(DriverArray, {
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
