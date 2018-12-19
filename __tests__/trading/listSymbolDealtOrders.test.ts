import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('listSymbolDealtOrders', () => {
  test('listSymbolDealtOrders', async () => {
    const res = await client.listSymbolDealtOrders({
      symbol,
    })
    expect(_.isArray(res.data.datas)).toBe(true)
  })
})