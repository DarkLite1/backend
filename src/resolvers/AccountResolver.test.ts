import { clearTable, runQuery } from '@test-utils/helpers/database'
import { getSchema } from '@utils/apollo'
import { graphql, GraphQLSchema } from 'graphql'

const tableName = 'Account'
let schema: GraphQLSchema

beforeAll(async () => {
  await clearTable(tableName)
  schema = await getSchema()
})

describe('the addAccount Mutation', () => {
  describe('should create an account', () => {
    it('with only the property accountIdentifier', async () => {
      const query = `
      mutation {
        addAccount(
          options: {
            accountIdentifier: "chuck-002"
          }
        ) {
          __typename
          ... on Account {
            accountIdentifier
          }
        }
      }    
      `

      const { data, errors } = await graphql(schema, query)

      const databaseResponse = await runQuery(
        `SELECT TOP 1 * FROM ${tableName} 
      WHERE accountIdentifier = '${data!.addAccount.accountIdentifier}'`
      )

      expect(errors).toBeUndefined()
      expect(databaseResponse).toMatchObject([
        {
          accountIdentifier: 'chuck-002',
          name: null,
          userName: null,
        },
      ])
    })

    it('with all possible properties', async () => {
      const query = `
      mutation {
        addAccount(
          options: {
            accountIdentifier: "agent-007"
            name: "James Bond"
            userName: "James.Bond@contoso.com"
          }
        ) {
          __typename
          ... on Account {
            accountIdentifier
          }
        }
      }    
      `

      const { data, errors } = await graphql(schema, query)

      const databaseResponse = await runQuery(
        `SELECT TOP 1 * FROM ${tableName} 
      WHERE accountIdentifier = '${data!.addAccount.accountIdentifier}'`
      )

      expect(errors).toBeUndefined()
      expect(databaseResponse).toMatchObject([
        {
          accountIdentifier: 'agent-007',
          name: 'James Bond',
          userName: 'James.Bond@contoso.com',
        },
      ])
    })
  })

  describe('should not create an account', () => {
    it('when the account already exists', async () => {
      const query = `
      mutation {
        addAccount(
          options: {
            accountIdentifier: "agent-007"
          }
        ){
          __typename
        }
      }      
      `

      const response = await graphql(schema, query)
      expect(response.errors).toBeUndefined()
      expect(response.data).toBeDefined()

      const { data, errors } = await graphql(schema, query)
      expect(errors).toBeUndefined()
      expect(data).toMatchObject({
        addAccount: { __typename: 'ExistsAlready' },
      })
    })
  })

  describe('should throw an error', () => {
    it('when the accountIdentifier argument is missing', async () => {
      const query = `
      mutation {
        addAccount(
          options: {
            name: "James Bond"
            userName: "James.Bond@contoso.com"
          }
        ) {
          __typename
        }
      }    
    `
      const { data, errors } = await graphql(schema, query)

      expect(data).toBeUndefined()
      expect(errors).toMatchObject([
        {
          message: `Field \"AccountInput.accountIdentifier\" of required type \"String!\" was not provided.`,
        },
      ])
    })
  })
})
