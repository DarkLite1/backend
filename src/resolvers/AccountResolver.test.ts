import { callGraphql } from '../test-utils/helpers/axios'
import { clearTable } from '../test-utils/helpers/database'

beforeEach( async()=> {
  await clearTable('User')
})

describe('Account entity', () => {
  it('add account', async () => {
    const actual = await callGraphql(
      `mutation {
        addAccount(options: { 
          accountIdentifier: "7csdcd8-8a5f-49c3-ab9a-0198d42dd253"
          name: "Jake, Bob (Braine-l’Alleud) JAM"
          userName: "Bob.Marley@contoso.com"
        }) {
          accountIdentifier
          name
          userName
        }
      }`
    )

    expect(actual.data).toMatchObject({
      data: {
        addAccount: {
          accountIdentifier: '7csdcd8-8a5f-49c3-ab9a-0198d42dd253',
          name: 'Jake, Bob (Braine-l’Alleud) JAM',
          userName: 'Bob.Marley@contoso.com',
        },
      },
    })
  })
})

// query: `
//   query PostsForAuthor {
//     author(id: 1) {
//       firstName
//         posts {
//           title
//           votes
//         }
//       }
//     }
//   `,
