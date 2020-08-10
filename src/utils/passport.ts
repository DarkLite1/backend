import {
  IBearerStrategyOptionWithRequest,
  BearerStrategy,
  ITokenPayload,
} from 'passport-azure-ad'
import { ENVIRONMENT } from '@environment'
import { Account } from '@it-portal/entity/Account'

const config: IBearerStrategyOptionWithRequest = {
  identityMetadata: ENVIRONMENT.azure.identityMetadata,
  clientID: ENVIRONMENT.azure.clientID,
  validateIssuer: ENVIRONMENT.mode === 'production',
  loggingLevel: ENVIRONMENT.mode === 'production' ? 'warn' : 'info',
  passReqToCallback: false,
}

export const bearerStrategy = new BearerStrategy(
  config,
  async (token: ITokenPayload, done: CallableFunction) => {
    try {
      if (!token.oid) throw 'token oid missing'

      const knownAccount = await Account.findOne({
        accountIdentifier: token.oid,
      })
      if (knownAccount) return done(null, knownAccount, token)

      const account = new Account()
      account.accountIdentifier = token.oid
      account.name = token.name
      account.userName = (token as any).preferred_username
      const newAccount = await account.save()
      return done(null, newAccount, token)
    } catch (error) {
      console.error(`Failed adding the user to the request object: ${error}`)
    }
  }
)
