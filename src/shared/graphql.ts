import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Error {
  @Field()
  message: string
}

@ObjectType()
export class ApiError extends Error {
  @Field()
  code: string

  @Field()
  message: string
}