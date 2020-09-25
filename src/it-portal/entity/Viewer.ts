import { Field, ObjectType } from 'type-graphql'
import { Preference } from '@it-portal/entity/Preference'

@ObjectType()
export class Viewer {
  @Field({ nullable: true })
  //   @Field(() => Preference, { nullable: true })
  preference: Preference
}
