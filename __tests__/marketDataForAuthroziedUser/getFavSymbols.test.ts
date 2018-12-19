import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('getFavSymbols', () => {
  test('getFavSymbols', async () => {
    const res = await client.getFavSymbols()
    expect(_.isArray(res.data)).toBe(true)

    res.data.forEach((item) => {
      expect(_.isString(item)).toBe(true)
    })
  })
})