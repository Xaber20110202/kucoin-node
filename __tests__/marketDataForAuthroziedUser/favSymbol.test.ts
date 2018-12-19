import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('favSymbol', () => {
  test('favSymbol', async () => {
    const res1 = await client.getFavSymbols()
    const isFav = res1.data.indexOf(symbol) !== -1

    const res2 = await client.favSymbol({
      symbol,
      fav: isFav ? 0 : 1,
    })
    expect(res2.success).toBe(true)

    const res3 = await client.favSymbol({
      symbol,
      fav: isFav ? 1 : 0,
    })
    expect(res3.success).toBe(true)
  })
})