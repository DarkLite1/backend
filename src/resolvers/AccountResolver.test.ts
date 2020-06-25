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
  it('should create an account when it does not exist', async () => {
    const query = `
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
    const { data, errors } = await graphql(schema, query)

    const databaseResponse = await runQuery(
      `SELECT TOP 1 * FROM ${tableName} 
      WHERE accountIdentifier = '${data!.addAccount.accountIdentifier}'`
    )

    expect(errors).toBeUndefined()
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
    const query = `
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
    const { errors } = await graphql(schema, query)
    // const { data, errors } = await graphql(schema, query)

    // console.dir(data)
    // console.dir(errors)

    // expect(data).toBeUndefined()
    expect(errors).toMatchObject([
      {
        message:
          "Failed adding account: the account with accountIdentifier 'agent007' already exists.",
      },
    ])
  })
})
