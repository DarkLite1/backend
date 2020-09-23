import { clearTable } from '@test-utils/helpers/database'
import { callGraphql } from '@test-utils/helpers/graphql'
// import faker from 'faker'

const preferenceTable = 'preference'
const accountTable = 'account'

beforeAll(async () => {
  await clearTable([preferenceTable, accountTable])
})

describe('the query', () => {
  // populate tables with data
  // const fakeAccount = {
  //   accountIdentifier: faker.random.uuid(),
  //   name: faker.name.findName(),
  //   userName: faker.internet.email(),
  // }

  // await runQuery(`INSERT INTO ${preferenceTable}(accountIdentifier)
  // VALUES ('${fakeAccount.accountIdentifier}')`)

  it('viewerPreference should return null when there are no preferences', async () => {
    const source = `
    query viewerPreference {
      viewerPreference {
        id
        language
      }
    }
    `
    const context = {
      user: {
        id: 1,
      },
    }

    const { data, errors } = await callGraphql({ source, context })
    expect(errors).toBeUndefined()
    expect(data).toMatchObject({ viewerPreference: null })
  })
})
