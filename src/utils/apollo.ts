import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { AccountResolver } from '@resolvers/AccountResolver'
import { PreferenceResolver } from '@resolvers/PreferenceResolver'
import { ViewerResolver } from '@resolvers/ViewerResolver'
import { getUser } from '@utils/passport'
import { ENVIRONMENT } from '@environment'

export const getSchema = async () => {
  return await buildSchema({
    validate: true,
    resolvers: [AccountResolver, PreferenceResolver, ViewerResolver],
  })
}

const playgroundEnabled = ENVIRONMENT.mode !== 'production'

if (!playgroundEnabled) {
  console.log(
    'LOG: For security reasons the Playground is disabled in Production mode'
  )
}

const context = async ({
  req,
  res,
}: {
  req: Express.Request
  res: Express.Response
}) => {
  try {
    const user = await getUser(req, res)
    // console.log('User found', user)
    return {
      user,
    }
  } catch (error) {
    // console.log('Failed creating the context: ', error)
    throw new AuthenticationError(error)
  }
}

export const getApolloServer = async () => {
  return new ApolloServer({
    schema: await getSchema(),
    context,
    introspection: playgroundEnabled,
    playground: playgroundEnabled,
  })
}
