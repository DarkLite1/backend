import { clearTable, runQuery } from '@test-utils/helpers/database'
import { callGraphql } from '@test-utils/helpers/graphql'

const tableName = 'Account'

beforeAll(async () => {
  await clearTable(tableName)
})

describe('the addAccount Mutation', () => {
  describe('should create an account', () => {
    it('with only the property accountIdentifier', async () => {
      const source = `
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

      const { data, errors } = await callGraphql({ source })

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
      const source = `
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

      const { data, errors } = await callGraphql({
        source,
      })

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
      const source = `
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

      const response = await callGraphql({ source })
      expect(response.errors).toBeUndefined()
      expect(response.data).toBeDefined()

      const { data, errors } = await callGraphql({ source })
      expect(errors).toBeUndefined()
      expect(data).toMatchObject({
        addAccount: { __typename: 'ExistsAlready' },
      })
    })
  })

  describe('should throw an error', () => {
    it('when the accountIdentifier argument is missing', async () => {
      const source = `
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
      const { data, errors } = await callGraphql({ source })

      expect(data).toBeUndefined()
      expect(errors).toMatchObject([
        {
          message: `Field \"AccountInput.accountIdentifier\" of required type \"String!\" was not provided.`,
        },
      ])
    })
    it('when the accountIdentifier has more than 50 characters', async () => {
      const source = `
      mutation {
        addAccount(
          options: {
            accountIdentifier: "123456789-123456789-123456789-123456789-123456789-1"
            name: "James Bond"
            userName: "James.Bond@contoso.com"
          }
        ) {
          __typename
        }
      }    
    `
      const { data, errors } = await callGraphql({ source })

      expect(data).toBeNull()
      expect(errors).toMatchObject([
        {
          message: `Argument Validation Error`,
        },
      ])
    })
  })
})
