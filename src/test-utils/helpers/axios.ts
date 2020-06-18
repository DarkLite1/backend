import axios from 'axios'

const uri = 'http://localhost:5000/'

export const callGraphql = (request: string) => {
  return axios({
    url: uri,
    method: 'post',
    data: {
      query: request,
      //   query:`\`${request}\``,
    },
  })
}
