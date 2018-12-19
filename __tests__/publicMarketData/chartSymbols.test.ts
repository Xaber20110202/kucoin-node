import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('chartSymbols', () => {
  test('chartSymbols', async () => {
    const res = await client.chartSymbols({
      symbol,
    })
    expect(_.isArray(res.supported_resolutions)).toBe(true)
    expect(res.description).toBe(symbol)
  })
})