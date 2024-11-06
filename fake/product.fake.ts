import { defineFakeRoute } from 'vite-plugin-fake-server/client'

import ky from 'ky'
import { resultSuccess } from './utils'

export default defineFakeRoute([
  {
    url: '/api/product/test-get',
    timeout: 1000,
    method: 'get',
    response: async ({ query }) => {
      // get query params
      console.log(query)
      const data = await ky
        .get('https://jsonplaceholder.typicode.com/posts')
        .json()
      return resultSuccess(data)
    },
  },
  {
    url: '/api/product/',
    timeout: 1000,
    method: 'post',
    response: async ({ body }) => {
      console.log(body)
      const data = await ky
        .post('https://jsonplaceholder.typicode.com/posts', {
          json: {
            title: 'foo',
            body: 'bar',
            userId: 1,
          },
        })
        .json()
      return resultSuccess(data)
    },
  },
])
