import {
  Resolver,
  Mutation,
  Arg,
  Query,
  InputType,
  Field,
  ObjectType,
  createUnionType,
} from 'type-graphql'
import { Account } from '@it-portal/entity/Account'
import { plainToClass } from 'class-transformer'

@ObjectType()
class ExistsAlready {
  @Field()
  message: string

  @Field()
  accountIdentifier: string

  @Field()
  account: Account
}

@InputType()
class AccountInput {
  @Field()
  accountIdentifier: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  userName?: string
}

@InputType()
class AccountUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  userName?: string
}

const AccountResultUnion = createUnionType({
  name: 'AccountAddResult',
  types: () => [Account, ExistsAlready] as const,
})

@Resolver()
export class AccountResolver {
  @Mutation(() => AccountResultUnion)
  async addAccount(
    @Arg('options', () => AccountInput) options: AccountInput
  ): Promise<typeof AccountResultUnion> {
    try {
      const account = await Account.findOne({
        accountIdentifier: options.accountIdentifier,
      })

      if (account) {
        return plainToClass(ExistsAlready, {
          message: `Cannot add duplicate accounts: an account with accountIdentifier '${options.accountIdentifier}' already exists.`,
          accountIdentifier: options.accountIdentifier,
          account: account
        })
      }
      return await Account.create(options).save()
    } catch (error) {
      if (error.message.includes('Cannot insert duplicate key')) {
        throw new Error(
          `Failed adding account: the account with accountIdentifier '${options.accountIdentifier}' already exists.`
        )
      } else {
        throw new Error(`Failed adding account: ${error}`)
      }
    }
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
