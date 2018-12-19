
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('balances', () => {
  test('balances', async () => {
    const res = await client.balances()
    expect(_.isArray(res.data.datas)).toBe(true)

    const coin = res.data.datas.find(item => item.coinType === 'ETH')

    expect(coin.coinType).toBe('ETH')
    expect(coin.balance).toBeGreaterThanOrEqual(0)
    expect(coin.freezeBalance).toBeGreaterThanOrEqual(0)
  })
})