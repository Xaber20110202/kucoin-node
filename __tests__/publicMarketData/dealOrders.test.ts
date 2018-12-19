import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('dealOrders', () => {
  test('dealOrders', async () => {
    const res = await client.dealOrders({
      symbol,
    })
    expect(_.isArray(res.data)).toBe(true);

    (res.data as any).forEach(item => {
      expect(_.isNumber(item[0])).toBe(true)
      expect(_.isString(item[1])).toBe(true)
      expect(_.isNumber(item[2])).toBe(true)
      expect(_.isNumber(item[3])).toBe(true)
      expect(_.isNumber(item[4])).toBe(true)
      expect(_.isString(item[5])).toBe(true)
    })
  })
})