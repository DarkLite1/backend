import { Resolver, Arg, Query, Ctx } from 'type-graphql'
import { Roster } from '@it-portal/entity/SAP/Roster'

interface Context {
  user: Account
  dataSources: string
}

@Resolver()
export class RosterResolver {
  @Query(() => [Roster])
  async roster(@Ctx() ctx: Context, @Arg('date', () => String) date: string) {
    return await ctx.dataSources.sapRosterApi.getRoster(date)
  }
}
