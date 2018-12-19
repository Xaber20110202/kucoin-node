import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('kline', () => {
  test('kline', async () => {
    const res = await client.kline({
      symbol,
      type: '1min',
      from: Math.round(new Date('2018-10-01 00:00:00').getTime() / 1000),
      to: Math.round(new Date('2018-11-01 00:00:00').getTime() / 1000),
    })
    expect(_.isArray(res.data)).toBe(true);

    (res.data as any).forEach(item => {
      expect(_.isArray(item)).toBe(true)
    })
  })
})