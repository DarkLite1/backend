import { runQuery, tableName } from '@test-utils/helpers/database'
import { callGraphql } from '@test-utils/helpers/graphql'
import faker from 'faker'

describe('the query viewerPreference', () => {
  it('should return null when there are no preferences for the viewer', async () => {
    const fakeAccountIdentifier = faker.random.uuid()

    await runQuery(`
    INSERT INTO ${tableName.account} (accountIdentifier) 
    VALUES ('${fakeAccountIdentifier}')`)

    const fakeAccountTableContent = await runQuery(`
    SELECT * FROM ${tableName.account} 
    WHERE accountIdentifier = '${fakeAccountIdentifier}'`)

    const source = `
    query viewerPreference {
      viewerPreference {
        id
        language
      }
    }
    `
    const context = {
      user: fakeAccountTableContent,
    }

    const { data, errors } = await callGraphql({ source, context })
    expect(errors).toBeUndefined()
    expect(data).toMatchObject({ viewerPreference: null })
  })
})
