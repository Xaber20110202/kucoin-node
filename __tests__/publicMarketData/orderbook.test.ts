import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('orderbook', () => {
  test('orderbook', async () => {
    const res = await client.orderBook({
      symbol,
    })
    expect(_.isArray(res.data.SELL)).toBe(true)
    expect(_.isArray(res.data.BUY)).toBe(true)
  })

  test('sellOrderBook', async () => {
    const res = await client.sellOrderBook({ symbol })
    res.data.forEach(item => {
      expect(item.length).toBe(3)
    })
  })

  test('buyOrderBook', async () => {
    const res = await client.buyOrderBook({ symbol })
    res.data.forEach(item => {
      expect(item.length).toBe(3)
    })
  })
})