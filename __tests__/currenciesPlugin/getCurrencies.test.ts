
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('getCurrencies', () => {
  test('getCurrencies with no params', async () => {
    const res = await client.getCurrencies()
    expect(_.isArray(res.data.currencies)).toBe(true)

    res.data.currencies.forEach((item) => {
      expect(_.isString(item[0])).toBe(true)
      expect(_.isString(item[1])).toBe(true)
    })
  })

  test('getCurrencies with params', async () => {
    const res = await client.getCurrencies({
      coins: 'BTC,ETH',
    })
    expect(_.isArray(res.data.currencies)).toBe(true)

    res.data.currencies.forEach((item) => {
      expect(_.isString(item[0])).toBe(true)
      expect(_.isString(item[1])).toBe(true)
    })

    expect(_.isPlainObject(res.data.rates)).toBe(true)
  })
})