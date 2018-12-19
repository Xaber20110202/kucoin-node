import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('stickSymbol', () => {
  test('stickSymbol', async () => {
    const res1 = await client.getStickSymbols()
    const isStick = res1.data.indexOf(symbol) !== -1

    const res2 = await client.stickSymbol({
      symbol,
      stick: isStick ? 0 : 1,
    })
    expect(res2.success).toBe(true)

    const res3 = await client.stickSymbol({
      symbol,
      stick: isStick ? 1 : 0,
    })
    expect(res3.success).toBe(true)
  })
})