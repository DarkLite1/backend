import {
  IBearerStrategyOptionWithRequest,
  BearerStrategy,
  ITokenPayload,
} from 'passport-azure-ad'
import { ENVIRONMENT } from '@environment'
import { Account } from '@it-portal/entity/Account'
import passport from 'passport'

const config: IBearerStrategyOptionWithRequest = {
  identityMetadata: ENVIRONMENT.azure.identityMetadata,
  clientID: ENVIRONMENT.azure.clientID,
  validateIssuer: true,
  loggingLevel: 'warn',
  passReqToCallback: false,
}

const bearerStrategy = new BearerStrategy(
  config,
  async (token: ITokenPayload, done: CallableFunction) => {
    try {
      if (!token.oid) return done(new Error('No oid found'), null)

      const knownAccount = await Account.findOne({
        accountIdentifier: token.oid,
      })
      if (knownAccount) return done(null, knownAccount, token)

      const newAccount = await Account.create({
        accountIdentifier: token.oid,
        name: token.name,
        userName: (token as any).preferred_username,
      }).save()
      return done(null, newAccount, token)
    } catch (error) {
      console.log(`bearerStrategy failed: ${error}`)
      return done(new Error(`bearerStrategy failed: ${error}`), null)
    }
  }
)

export const getUser = (
  req: Express.Request,
  res: Express.Response
): Promise<Account> =>
  new Promise((resolve, reject) => {
    passport.authenticate('oauth-bearer', { session: false }, (err, user) => {
      if (err) reject(err)
      if (user) resolve(user)
      else reject('Access denied')
    })(req, res)
  })

passport.use(bearerStrategy)
