import { Query, Resolver } from 'type-graphql'
import { Preference } from '@it-portal/entity/Preference'

@Resolver()
export class PreferenceResolver {
  @Query(() => [Preference])
  preferences() {
    return Preference.find()
  }
}
