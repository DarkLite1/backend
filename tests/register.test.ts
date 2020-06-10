import axios from 'axios'

const uri = 'http://localhost:5000/'

function sum(a, b) {
  return a + b
}

test('adds 1 + 2 to equal 3', () => {
  console.log('jest test')
  expect(sum(1, 2)).toBe(3)
})

describe('Movie entity', () => {
  it('create movie', async () => {
    const actual = await axios({
      url: uri,
      method: 'post',
      data: {
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

        query: `
        mutation {
          createMovie(options: { title: "Pokahontas", minutes: 90 }) {
            title
          }
        }
        `,
      },
    })

    expect(actual.data).toMatchObject({
      data: {
        createMovie: {
          title: 'Pokahontas',
        },
      },
    })
  })
})
