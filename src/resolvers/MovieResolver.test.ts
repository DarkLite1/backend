import axios from 'axios'

const uri = 'http://localhost:5000/'

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
