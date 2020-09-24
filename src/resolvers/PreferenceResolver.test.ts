import { Account } from '@it-portal/entity/Account'
import { callGraphql } from '@test-utils/helpers/graphql'
import faker from 'faker'

describe('the query viewerPreference', () => {
  it('should return null when there are no preferences for the viewer', async () => {
    const user = new Account()
    user.accountIdentifier = faker.random.uuid()
    user.name = faker.name.findName()
    user.userName = faker.internet.email()
    const fakeAccountTableContent = await user.save()

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
  it('should return the preferences of the viewer', async () => {
    const user = new Account()
    user.accountIdentifier = faker.random.uuid()
    user.name = faker.name.findName()
    user.userName = faker.internet.email()
    const fakeAccountTableContent = await user.save()

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
