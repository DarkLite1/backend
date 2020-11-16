import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql'
import { MaxLength } from 'class-validator'
import { Preference } from '@it-portal/entity/Preference'
import { Account } from '@it-portal/entity/Account'

@InputType()
class AddPreferenceInput implements Partial<Preference> {
  @MaxLength(5)
  @Field({ nullable: true })
  language?: string
  
  @Field({ nullable: true })
  darkMode?: boolean
}

@Resolver()
export class PreferenceResolver {
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

      // console.log('setViewerPreference: ', preference)

      return preference
    } catch (error) {
      throw `Failed setting the viewer preference: ${error}`
    }
  }
}
