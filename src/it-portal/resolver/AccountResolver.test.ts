import { runQuery, tableName } from '@test-utils/helpers/database'
import { callGraphql } from '@test-utils/helpers/graphql'
import faker from 'faker'

describe('the Query', () => {
  const fakeAccountIdentifier = [
    faker.random.uuid(),
    faker.random.uuid(),
    faker.random.uuid(),
  ]

  beforeAll(async () => {
    await runQuery(`INSERT INTO ${tableName.account} (accountIdentifier)
    VALUES 
    ('${fakeAccountIdentifier[0]}'), 
    ('${fakeAccountIdentifier[1]}'), 
    ('${fakeAccountIdentifier[2]}')`)
  })

  // it('accounts should return all accounts', async () => {
  //   const source = `
  //   query {
  //     accounts {
  //       accountIdentifier
  //     }
  //   }
  //   `
  //   const { data, errors } = await callGraphql({ source })
  //   expect(errors).toBeUndefined()
  //   expect(data).toEqual({
  //     accounts: [
  //       { accountIdentifier: fakeAccountIdentifier[0] },
  //       { accountIdentifier: fakeAccountIdentifier[1] },
  //       { accountIdentifier: fakeAccountIdentifier[2] },
  //     ],
  //   })
  // })

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
        `SELECT * FROM ${tableName.account} 
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
        `SELECT TOP 1 * FROM ${tableName.account} 
      WHERE accountIdentifier = '${data!.addAccount.accountIdentifier}'`
      )

      expect(errors).toBeUndefined()
      expect(databaseResponse).toMatchObject([fakeAccount])
    })
  })

  describe('should report an error', () => {
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
            userName: "${faker.internet.email()}"
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
          message: `Field \"AccountAddInput.accountIdentifier\" of required type \"String!\" was not provided.`,
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

describe('the updateAccount Mutation', () => {
  it('should return the account when it is updated', async () => {
    const fakeAccount = {
      accountIdentifier: faker.random.uuid(),
      name: faker.name.findName(),
      userName: faker.internet.email(),
    }

    await runQuery(`INSERT INTO ${tableName.account}(accountIdentifier)
    VALUES ('${fakeAccount.accountIdentifier}')`)

    const source = `
    mutation {
      updateAccount(
        accountIdentifier: "${fakeAccount.accountIdentifier}"
        input: { 
          name: "${fakeAccount.name}" 
          userName: "${fakeAccount.userName}" 
        }
      ) {
        __typename
        ... on Account {
          name
          userName
        }
      }
    }
    `
    const { data, errors } = await callGraphql({ source })
    expect(errors).toBeUndefined()
    expect(data).toEqual({
      updateAccount: {
        __typename: 'Account',
        name: fakeAccount.name,
        userName: fakeAccount.userName,
      },
    })
  })
  describe('should report an error', () => {
    it('when  the account is not found', async () => {
      const fakeAccount = {
        accountIdentifier: faker.random.uuid(),
        name: faker.name.findName(),
        userName: faker.internet.email(),
      }

      const source = `
      mutation {
        updateAccount(
          accountIdentifier: "${fakeAccount.accountIdentifier}"
          input: { 
            name: "${fakeAccount.name}" 
            userName: "${fakeAccount.userName}" 
          }
        ) {
          __typename
        }
      }
      `
      const { data, errors } = await callGraphql({ source })
      expect(errors).toBeUndefined()
      expect(data).toEqual({
        updateAccount: { __typename: 'NotFound' },
      })
    })
  })
})

describe('the removeAccount Mutation', () => {
  it('should remove an account', async () => {
    const fakeAccount = {
      accountIdentifier: faker.random.uuid(),
    }

    await runQuery(`INSERT INTO ${tableName.account}(accountIdentifier)
    VALUES ('${fakeAccount.accountIdentifier}')`)

    const source = `
    mutation {
      removeAccount(
        accountIdentifier: "${fakeAccount.accountIdentifier}"
      ) {
        __typename
      }
    }
    `
    const { data, errors } = await callGraphql({ source })
    expect(errors).toBeUndefined()
    expect(data).toEqual({
      removeAccount: {
        __typename: 'Success',
      },
    })
  })
  describe('should report an error', () => {
    it('when  the account is not found', async () => {
      const fakeAccount = {
        accountIdentifier: faker.random.uuid(),
      }

      const source = `
      mutation {
        removeAccount(
          accountIdentifier: "${fakeAccount.accountIdentifier}"
        ) {
          __typename
        }
      }
      `
      const { data, errors } = await callGraphql({ source })
      expect(errors).toBeUndefined()
      expect(data).toEqual({
        removeAccount: { __typename: 'NotFound' },
      })
    })
  })
})
