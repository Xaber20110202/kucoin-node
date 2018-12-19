import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('coins', () => {
  test('coins', async () => {
    const res = await client.coins()
    expect(_.isArray(res.data)).toBe(true);

    (res.data as any).forEach(item => {
      expect(_.isString(item.coin)).toBe(true)
    })
  })
})