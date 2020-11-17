import {
  Resolver,
  Mutation,
  Arg,
  Query,
  InputType,
  Field,
  ObjectType,
  createUnionType,
  Ctx,
} from 'type-graphql'
import { Account } from '@it-portal/entity/Account'
import { plainToClass } from 'class-transformer'
import { MaxLength } from 'class-validator'
import { Error } from '@resolvers/Shared/Helpers'

@ObjectType()
class NotFound extends Error {}

@ObjectType()
class Success {
  @Field()
  message: string
}

@ObjectType()
class ExistsAlready extends Error {
  @Field()
  account: Account
}

@InputType()
class AccountAddInput {
  @MaxLength(50)
  @Field()
  accountIdentifier: string

  @MaxLength(100)
  @Field({ nullable: true })
  name?: string

  @MaxLength(100)
  @Field({ nullable: true })
  userName?: string
}

@InputType()
class AccountUpdateInput {
  @MaxLength(100)
  @Field({ nullable: true })
  name?: string

  @MaxLength(100)
  @Field({ nullable: true })
  userName?: string
}

const AccountAddResultUnion = createUnionType({
  name: 'AccountAddResult',
  types: () => [Account, ExistsAlready] as const,
})

const AccountUpdateResultUnion = createUnionType({
  name: 'AccountUpdateResult',
  types: () => [Account, NotFound] as const,
})

const AccountRemoveResultUnion = createUnionType({
  name: 'AccountRemoveResult',
  types: () => [Success, NotFound] as const,
})

@Resolver()
export class AccountResolver {
  @Mutation(() => AccountAddResultUnion)
  async addAccount(
    @Arg('options', () => AccountAddInput) options: AccountAddInput
  ): Promise<typeof AccountAddResultUnion> {
    try {
      const account = await Account.findOne({
        accountIdentifier: options.accountIdentifier,
      })

      if (account) {
        return plainToClass(ExistsAlready, {
          message: `An account with accountIdentifier '${options.accountIdentifier}' already exists.`,
          account: account,
        })
      }
      return await Account.create(options).save()
    } catch (error) {
      throw `Failed adding account: ${error}`
    }
  }

  @Mutation(() => AccountUpdateResultUnion)
  async updateAccount(
    @Arg('accountIdentifier', () => String) accountIdentifier: string,
    @Arg('input', () => AccountUpdateInput) input: AccountUpdateInput
  ): Promise<typeof AccountUpdateResultUnion> {
    try {
      await Account.update({ accountIdentifier }, input)
      const account = await Account.findOne({ accountIdentifier })
      if (account) return account
      return plainToClass(NotFound, {
        message: `No account found with accountIdentifier '${accountIdentifier}'`,
      })
    } catch (error) {
      throw 'account not found'
    }
  }

  @Mutation(() => AccountRemoveResultUnion)
  async removeAccount(
    @Arg('accountIdentifier', () => String) accountIdentifier: string
  ) {
    const account = await Account.findOne({ accountIdentifier })
    if (account) {
      await Account.delete({ accountIdentifier })
      return plainToClass(Success, {
        message: `Account with accountIdentifier '${accountIdentifier}' removed`,
      })
    } else {
      return plainToClass(NotFound, {
        message: `No account found with accountIdentifier '${accountIdentifier}'`,
      })
    }
  }

  @Query(() => Account)
  currentUser(@Ctx() ctx: {user: Account}) {
    return ctx.user
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
