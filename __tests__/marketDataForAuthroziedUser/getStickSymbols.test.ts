import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('getStickSymbols', () => {
  test('getStickSymbols', async () => {
    const res = await client.getStickSymbols()
    expect(_.isArray(res.data)).toBe(true)

    res.data.forEach((item) => {
      expect(_.isString(item)).toBe(true)
    })
  })
})