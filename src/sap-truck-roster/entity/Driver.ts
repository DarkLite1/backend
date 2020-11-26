import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Driver {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly firstName?: string

  @Field({ nullable: true })
  readonly lastName?: string

  @Field({ nullable: true })
  readonly email?: string

  @Field({ nullable: true })
  readonly telephone?: string

  @Field({ nullable: true })
  readonly despatchGroup?: string

  @Field({ nullable: true })
  readonly country?: string

  @Field( { nullable: true })
  readonly postCode?: string

  @Field({ nullable: true })
  readonly city?: string

  @Field({ nullable: true })
  readonly streetHouse?: string

  @Field({ nullable: true })
  readonly additionalRefNr?: string

  @Field({ nullable: true })
  readonly specialProp?: string

  @Field({ nullable: true })
  readonly mainWorkPlant?: string

  @Field({ nullable: true })
  readonly createdOn?: string

  @Field({ nullable: true })
  readonly deletionFlag?: string
}
