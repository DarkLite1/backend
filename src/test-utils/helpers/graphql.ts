import { graphql, GraphQLSchema } from 'graphql'
import { getSchema } from '@utils/apollo'
import { Maybe } from 'type-graphql'

let schema: GraphQLSchema

interface Options {
  source: string
  context?: {}
  variables?: Maybe<{
    [key: string]: any
  }>
}

export const callGraphql = async ({ source, context, variables }: Options) => {
  if (!schema) {
    schema = await getSchema()
  }

  return await graphql(schema, source, null, context, variables)
}
