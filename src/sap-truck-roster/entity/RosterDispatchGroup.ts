import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class RosterDispatchGroup {
  @Field()
  readonly date: string

  @Field(() => [String])
  readonly dispatchGroup: string[]
}
