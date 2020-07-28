import {
  IBearerStrategyOptionWithRequest,
  BearerStrategy,
  ITokenPayload,
} from 'passport-azure-ad'
import { ENVIRONMENT } from '@environment'

const config: IBearerStrategyOptionWithRequest = {
  identityMetadata: ENVIRONMENT.azure.identityMetadata,
  clientID: ENVIRONMENT.azure.clientID,
  validateIssuer: ENVIRONMENT.mode === 'production',
  loggingLevel: ENVIRONMENT.mode === 'production' ? 'warn' : 'info',
  passReqToCallback: false,
}

export const bearerStrategy = new BearerStrategy(
  config,
  (token: ITokenPayload, done: CallableFunction) => {
    // Send user info using the second argument
    const user = {
      name: 'bob',
    }
    return done(null, user, token)
  }
)
