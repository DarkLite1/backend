import { Account } from '@it-portal/entity/Account'
import { Preference } from '@it-portal/entity/Preference'
import { callGraphql } from '@test-utils/helpers/graphql'
import faker from 'faker'

describe('the Viewer query', () => {
  describe('preference should', () => {
    it('return null when there are no preferences for the viewer', async () => {
      const account = await Account.create({
        accountIdentifier: faker.random.uuid(),
        name: faker.name.findName(),
        userName: faker.internet.email(),
      }).save()

      const source = `
        query {
          viewer{
            preference {
              id
              language
            }
          }
        }
      `

      const context = { user: account }

      const { data, errors } = await callGraphql({ source, context })
      expect(errors).toBeUndefined()
      expect(data).toMatchObject({ viewer: { preference: null } })
    })
    it('should return the preferences of the viewer', async () => {
      const account = await Account.create({
        accountIdentifier: faker.random.uuid(),
        name: faker.name.findName(),
        userName: faker.internet.email(),
      }).save()

      account.preference = await Preference.create({ language: 'en-us' }).save()
      await account.save()

      const source = `
        query {
          viewer{
            preference {
              id
              language
            }
          }
        }
      `

      const context = { user: account }

      const { data, errors } = await callGraphql({ source, context })
      expect(errors).toBeUndefined()
      expect(data).toMatchObject({
        viewer: { preference: { language: 'en-us' } },
      })
    })
  })
})
