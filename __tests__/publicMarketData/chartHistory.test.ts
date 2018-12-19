import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('chartHistory', () => {
  test('chartHistory', async () => {
    const res = await client.chartHistory({
      symbol,
      resolution: 'D',
      from: Math.round(new Date('2018-10-01 00:00:00').getTime() / 1000),
      to: Math.round(new Date('2018-11-01 00:00:00').getTime() / 1000),
    });

    ['c', 't', 'v', 'h', 'l', 'o'].forEach(k => {
      expect(_.isArray(res[k])).toBe(true)
      res[k].forEach(x => {
        expect(_.isNumber(x)).toBe(true)
      })
    })
  })
})