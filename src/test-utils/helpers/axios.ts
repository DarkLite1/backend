import axios from 'axios'
import { ENVIRONMENT } from '../../environment'

export const callGraphql = (request: string) => {
  return axios({
    url: `http://localhost:${ENVIRONMENT.port}`,
    method: 'post',
    data: {
      query: request,
    },
  })
}
