import { Account } from '@it-portal/entity/Account'
import { callGraphql } from '@test-utils/helpers/graphql'
import faker from 'faker'

let context: { user: Account }

describe('the mutation setViewerPreference', () => {
  beforeAll(async () => {
    const account = await Account.create({
      accountIdentifier: faker.datatype.uuid(),
      name: faker.name.findName(),
      userName: faker.internet.email(),
    }).save()
    context = { user: account }
  })
  it('should create new preferences if the viewer has none', async () => {
    const source = `
    mutation {
      setViewerPreference(options: { language: "xx-xx" }) {
        language
      }
    }
    `
    const { data, errors } = await callGraphql({ source, context })
    expect(errors).toBeUndefined()
    expect(data).toMatchObject({ setViewerPreference: { language: 'xx-xx' } })
  })
  it('should update the preference language', async () => {
    const source = `
    mutation {
      setViewerPreference(options: { language: "BB-BB" }) {
        language
      }
    }    
    `
    const { data, errors } = await callGraphql({ source, context })
    expect(errors).toBeUndefined()
    expect(data).toMatchObject({ setViewerPreference: { language: 'BB-BB' } })
  })
  it('should update the preference darkMode', async () => {
    const source = `
    mutation {
      setViewerPreference(options: { darkMode: true }) {
        darkMode
      }
    }    
    `
    const { data, errors } = await callGraphql({ source, context })
    expect(errors).toBeUndefined()
    expect(data).toMatchObject({ setViewerPreference: { darkMode: true } })
  })
})
