import { clearTable, runQuery } from '@test-utils/helpers/database'
import { callGraphql } from '@test-utils/helpers/graphql'
import faker from 'faker'

const tableName = 'account'

describe('the Query', () => {
  const fakeAccountIdentifier = [
    faker.random.uuid(),
    faker.random.uuid(),
    faker.random.uuid(),
  ]

  beforeAll(async () => {
    await clearTable(tableName)

    await runQuery(`INSERT INTO ${tableName}(accountIdentifier)
    VALUES 
    ('${fakeAccountIdentifier[0]}'), 
    ('${fakeAccountIdentifier[1]}'), 
    ('${fakeAccountIdentifier[2]}')`)
  })

  it('accounts should return all accounts', async () => {
    const source = `
    query {
      accounts {
        accountIdentifier
      }
    }
    `
    const { data, errors } = await callGraphql({ source })
    expect(errors).toBeUndefined()
    expect(data).toEqual({
      accounts: [
        { accountIdentifier: fakeAccountIdentifier[0] },
        { accountIdentifier: fakeAccountIdentifier[1] },
        { accountIdentifier: fakeAccountIdentifier[2] },
      ],
    })
  })

  it('account should return a single account', async () => {
    const source = `
    query {
      account(accountIdentifier: "${fakeAccountIdentifier[0]}") {
        accountIdentifier
      }
    }
    `
    const { data, errors } = await callGraphql({ source })
    expect(errors).toBeUndefined()
    expect(data).toEqual({
      account: { accountIdentifier: fakeAccountIdentifier[0] },
    })
  })
})

describe('the addAccount Mutation', () => {
  beforeAll(async () => {
    await clearTable(tableName)
  })
  
  describe('should create an account', () => {
    it('with only the property accountIdentifier', async () => {
      const fakeAccount = {
        accountIdentifier: faker.random.uuid(),
        name: null,
        userName: null,
      }

      const source = `
      mutation {
        addAccount(
          options: {
            accountIdentifier: "${fakeAccount.accountIdentifier}"
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
      expect(databaseResponse).toMatchObject([fakeAccount])
    })

    it('with all possible properties', async () => {
      const fakeAccount = {
        accountIdentifier: faker.random.uuid(),
        name: faker.name.findName(),
        userName: faker.internet.email(),
      }

      const source = `
      mutation {
        addAccount(
          options: {
            accountIdentifier: "${fakeAccount.accountIdentifier}"
            name: "${fakeAccount.name}"
            userName: "${fakeAccount.userName}"
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
      expect(databaseResponse).toMatchObject([fakeAccount])
    })
  })

  describe('should not create an account', () => {
    it('when the account already exists', async () => {
      const source = `
      mutation {
        addAccount(
          options: {
            accountIdentifier: "${faker.random.uuid()}"
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
            name: "${faker.name}"
            userName: "${faker.internet.email}"
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
