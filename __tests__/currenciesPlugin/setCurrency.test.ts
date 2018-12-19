
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('setCurrency', () => {
  test('setCurrency', async () => {
    const res = await client.setCurrency({
      currency: 'USD',
    })
    expect(res.success).toBe(true)
  })
})