import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('coinBalance', () => {
  test('coinBalance', async () => {
    const res = await client.coinBalance({
      coin: 'ETH',
    })
    expect(res.data.coinType).toBe('ETH')
    expect(res.data.balance).toBeGreaterThanOrEqual(0)
    expect(res.data.freezeBalance).toBeGreaterThanOrEqual(0)
  })
})