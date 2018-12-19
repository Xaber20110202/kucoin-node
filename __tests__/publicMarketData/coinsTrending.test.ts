import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('coinsTrending', () => {
  test('coinsTrending no params', async () => {
    const res = await client.coinsTrending()
    expect(_.isArray(res.data)).toBe(true);

    (res.data as any).forEach(item => {
      expect(_.isString(item.coinPair)).toBe(true)
      expect(_.isArray(item.deals)).toBe(true)
    })
  })

  test('coinsTrending no params', async () => {
    const res = await client.coinsTrending({
      market: 'BTC',
    })
    expect(_.isArray(res.data)).toBe(true);

    (res.data as any).forEach(item => {
      expect(_.isString(item.coinPair)).toBe(true)
      expect(_.isArray(item.deals)).toBe(true)
    })
  })
})