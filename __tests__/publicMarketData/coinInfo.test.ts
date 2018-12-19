import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('coinInfo', () => {
  test('coinInfo', async () => {
    const res = await client.coinInfo({
      coin: 'BTC',
    })
    expect(_.isPlainObject(res.data)).toBe(true)
    expect(res.data.coin).toBe('BTC')
  })
})