import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('listMergedDealtOrders', () => {
  test('listMergedDealtOrders', async () => {
    const res = await client.listMergedDealtOrders()
    expect(_.isArray(res.data.datas)).toBe(true)
  })

  test('listMergedDealtOrdersWithSymbolParams', async () => {
    const res = await client.listMergedDealtOrders({
      symbol,
    })
    expect(_.isArray(res.data.datas)).toBe(true)
  })
})