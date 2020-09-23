import { clearTable, runQuery } from '@test-utils/helpers/database'
import { callGraphql } from '@test-utils/helpers/graphql'
import faker from 'faker'

const preferenceTable = 'preference'
const accountTable = 'account'

describe('the query viewerPreference', () => {
  const fakeAccountIdentifier = [
    faker.random.uuid(),
    faker.random.uuid(),
    faker.random.uuid(),
  ]

  beforeAll(async () => {
    await clearTable([preferenceTable, accountTable])

    // await runQuery(`INSERT INTO ${accountTable}(accountIdentifier)
    // VALUES ('${fakeAccountIdentifier[0]}')`)
  })

  it('should return null when there are no preferences for the viewer', async () => {
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
        id: fakeAccountIdentifier[0],
      },
    }

    const { data, errors } = await callGraphql({ source, context })
    expect(errors).toBeUndefined()
    expect(data).toMatchObject({ viewerPreference: null })
  })
})
