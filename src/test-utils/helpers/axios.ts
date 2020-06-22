import axios from 'axios'
import { ENVIRONMENT } from '../../environment'

const uri = `http://localhost:${ENVIRONMENT.port}`

export const callGraphql = (request: string) => {
  return axios({
    url: uri,
    method: 'post',
    data: {
      query: request,
    },
  })
}
