import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Error {
  @Field()
  message: string
}
