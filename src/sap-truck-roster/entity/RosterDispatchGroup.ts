import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class RosterDispatchGroup {
  @Field()
  readonly date: string

  // @Field()
  // date2(@Root() parent: RosterDispatchGroup): Date {
  //   return new Date(parent.date)
  // }

  @Field(() => [String])
  readonly dispatchGroup: string[]
}
