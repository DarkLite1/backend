import { clearTable } from '@test-utils/helpers/database'
import { callGraphql } from '@test-utils/helpers/graphql'
// import faker from 'faker'

const tableName = 'preference'

beforeAll(async () => {
  await clearTable(tableName)
})

describe('the preferences query', () => {
  it('should return all preferences', async () => {
    const source = `
    query {
      preferences {
        id
        language
      }
    }
    `
    const { data, errors } = await callGraphql({ source })
    expect(errors).toBeUndefined()
    expect(data).toMatchObject({ preferences: [] })
  })
})
