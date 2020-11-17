import { FieldResolver, Ctx, Resolver, Query } from 'type-graphql'
import { Viewer } from '@it-portal/entity/Viewer'
import { Account } from '@it-portal/entity/Account'

@Resolver(() => Viewer)
export class ViewerResolver {
  @Query(() => Viewer)
  viewer() {
    return Viewer
  }

  @FieldResolver()
  async preference(@Ctx() ctx: { user: Account }) {
    try {
      const account = await Account.findOne(
        { id: ctx.user.id },
        { relations: ['preference'] }
      )
      if (!account) throw 'Account not found'
      return account.preference
    } catch (error) {
      throw `Failed finding the viewer preference: ${error}`
    }
  }
}
