import { clearTable, runQuery } from '@test-utils/helpers/database'
import { client } from '@test-utils/helpers/graphql'
import { gql } from 'apollo-boost'
import { getSchema } from '@utils/apollo'
import { graphql, GraphQLSchema } from 'graphql'

const tableName = 'Account'
let schema: GraphQLSchema

beforeAll(async () => {
  await clearTable(tableName)
  schema = await getSchema()
})

describe('the addAccount Mutation', () => {
  it('should create an account when it does not exist', async () => {
    const graphqlResponse = await client.mutate({
      mutation: gql`
        mutation {
          addAccount(
            options: {
              accountIdentifier: "agent007"
              name: "James Bond"
              userName: "James.Bond@contoso.com"
            }
          ) {
            accountIdentifier
          }
        }
      `,
    })

    const databaseResponse = await runQuery(
      `SELECT TOP 1 * FROM ${tableName} 
      WHERE accountIdentifier = '${graphqlResponse.data.addAccount.accountIdentifier}'`
    )
    expect(databaseResponse).toMatchObject([
      {
        accountIdentifier: 'agent007',
        name: 'James Bond',
        userName: 'James.Bond@contoso.com',
      },
    ])
  })

  it('should throw an error when the accountIdentifier is missing', async () => {
    const query = `
    mutation {
      addAccount(
        options: {
          name: "Chuck"
          userName: "Chuck.Norris"
        }
      ) {
        accountIdentifier
        name
        userName
      }
    }    
    `
    const { data, errors } = await graphql(schema, query)

    expect(data).toBeUndefined()
    expect(errors).toMatchObject([
      {
        message:
          'Field AccountInput.accountIdentifier of required type String! was not provided.',
      },
    ])
  })

  it('should throw an error when the account already exists', async () => {
    const addAccount = gql`
      mutation {
        addAccount(
          options: {
            accountIdentifier: "agent007"
            name: "James Bond"
            userName: "James.Bond@contoso.com"
          }
        ) {
          accountIdentifier
        }
      }
    `

    await expect(
      client.mutate({
        mutation: addAccount,
      })
    ).rejects.toThrowError('the account already exists')
  })
})
