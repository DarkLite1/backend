import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import { Preference } from '@it-portal/entity/Preference'
import { MaxLength } from 'class-validator'
import { Account } from '@it-portal/entity/Account'

@InputType()
class AddPreferenceInput implements Partial<Preference> {
  @MaxLength(5)
  @Field()
  language: string
}

@Resolver()
export class PreferenceResolver {
  @Query(() => [Preference])
  preferences() {
    return Preference.find()
  }

  @Query(() => Preference, { nullable: true })
  async viewerPreference(@Ctx() ctx: { user: Account }) {
    try {
      const account = await Account.findOne(
        { id: ctx.user.id },
        { relations: ['preference'] }
      )
      return account?.preference
    } catch (error) {
      throw `Failed finding the viewer preference: ${error}`
    }
  }

  @Mutation(() => Preference)
  async setViewerPreference(
    @Arg('options') options: AddPreferenceInput,
    @Ctx() ctx: { user: Account }
  ): Promise<Preference> {
    try {
      const account = await Account.findOne(
        { id: ctx.user.id },
        { relations: ['preference'] }
      )

      if (!account) throw 'Account not found'

      let preference: Preference

      if (account.preference) {
        preference = Object.assign(account.preference, options)
        await preference.save()
      } else {
        preference = Preference.create(options)
        await preference.save()
        account.preference = preference
        await account.save()
      }

      return preference
    } catch (error) {
      throw `Failed setting the viewer preference: ${error}`
    }
  }

  @Mutation(() => Preference)
  async addPreference(
    @Arg('options') options: AddPreferenceInput
  ): Promise<Preference> {
    try {
      const preference = Preference.create(options)
      await preference.save()
      return preference
    } catch (error) {
      throw `Failed adding preference: ${error}`
    }
  }
}
