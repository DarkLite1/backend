import { Account } from '@it-portal/entity/Account'
import { Preference } from '@it-portal/entity/Preference'
import { callGraphql } from '@test-utils/helpers/graphql'
import faker from 'faker'

let context: { user: Account }

describe('the Viewer query', () => {
  beforeAll(async () => {
    const account = await Account.create({
      accountIdentifier: faker.random.uuid(),
      name: faker.name.findName(),
      userName: faker.internet.email(),
    }).save()
    context = { user: account }
  })
  describe('preference', () => {
    it('should return null when there are no preferences for the viewer', async () => {
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
      const { data, errors } = await callGraphql({ source, context })
      expect(errors).toBeUndefined()
      expect(data).toMatchObject({ viewer: { preference: null } })
    })
    it('should return the preferences of the viewer', async () => {
      context.user.preference = await Preference.create({
        language: 'nl-nl',
      }).save()
      await context.user.save()

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
      const { data, errors } = await callGraphql({ source, context })
      expect(errors).toBeUndefined()
      expect(data).toMatchObject({
        viewer: { preference: { language: 'nl-nl' } },
      })
    })
  })
})
