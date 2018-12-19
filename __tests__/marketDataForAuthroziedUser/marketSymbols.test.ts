import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('marketSymbols', () => {
  test('marketSymbols', async () => {
    const res = await client.marketSymbols()
    expect(_.isArray(res.data)).toBe(true)

    res.data.forEach((item) => {
      expect(_.isBoolean(item.fav)).toBe(true)
      expect(_.isBoolean(item.stick)).toBe(true)
    })
  })
})