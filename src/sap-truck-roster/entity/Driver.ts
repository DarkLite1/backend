import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Driver {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly firstName: string

  @Field()
  readonly lastName: string

  @Field()
  readonly email: string

  @Field()
  readonly telephone: string

  @Field()
  readonly despatchGroup: string

  @Field()
  readonly country: string

  @Field()
  readonly postCode: string

  @Field()
  readonly city: string

  @Field()
  readonly streetHouse: string

  @Field()
  readonly additionalRefNr: string

  @Field()
  readonly specialProp: string

  @Field()
  readonly mainWorkPlant: string

  @Field()
  readonly createdOn: string

  @Field()
  readonly deletionFlag: string
}
