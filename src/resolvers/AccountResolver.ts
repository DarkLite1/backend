import {
  Resolver,
  Mutation,
  Arg,
  Query,
  InputType,
  Field,
} from 'type-graphql'
import { Account } from '../it-portal/entity/Account'

@InputType()
class AccountInput {
  @Field()
  accountIdentifier: string

  @Field()
  name: string

  @Field()
  userName: string
}

@InputType()
class AccountUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  userName?: string
}

@Resolver()
export class AccountResolver {
  @Mutation(() => Account)
  async addAccount(@Arg('options', () => AccountInput) options: AccountInput) {
    return await Account.create(options).save()
  }

  @Mutation(() => Boolean)
  async updateAccount(
    @Arg('accountIdentifier', () => String) accountIdentifier: string,
    @Arg('input', () => AccountUpdateInput) input: AccountUpdateInput
  ) {
    await Account.update({ accountIdentifier }, input)
    return true
  }

  @Mutation(() => Boolean)
  async removeAccount(
    @Arg('accountIdentifier', () => String) accountIdentifier: string
  ) {
    await Account.delete({ accountIdentifier })
    return true
  }

  @Query(() => [Account])
  accounts() {
    return Account.find()
  }

  @Query(() => Account)
  account(@Arg('accountIdentifier', () => String) accountIdentifier: string) {
    return Account.findOne({ accountIdentifier })
  }
}
