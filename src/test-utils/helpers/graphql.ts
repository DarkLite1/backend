import { graphql, GraphQLSchema } from 'graphql'
import { getSchema } from '@utils/apollo'
import { Maybe } from 'type-graphql'

let schema: GraphQLSchema

interface Options {
  source: string
  variableValues?: Maybe<{
    [key: string]: any
  }>
}

export const callGraphql = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await getSchema()
  }

  return await graphql({
    schema,
    source,
    variableValues,
  })
}
