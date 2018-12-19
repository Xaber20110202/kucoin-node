import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('markets', () => {
  test('markets', async () => {
    const res = await client.markets()
    expect(_.isArray(res.data)).toBe(true);

    (res.data as any).forEach(item => {
      expect(_.isString(item)).toBe(true)
    })
  })
})