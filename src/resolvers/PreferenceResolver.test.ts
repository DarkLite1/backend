import { clearTable } from '@test-utils/helpers/database'
import { callGraphql } from '@test-utils/helpers/graphql'
// import faker from 'faker'

const tableName = 'preference'

beforeAll(async () => {
  await clearTable(tableName)
})

describe('the query', () => {
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
    expect(data).toBeNull()
  })
})
