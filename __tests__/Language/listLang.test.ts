
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('listLang', () => {
  test('listLang', async () => {
    const res = await client.listLang()
    expect(_.isArray(res.data)).toBe(true)

    res.data.forEach((item) => {
      expect(_.isString(item[0])).toBe(true)
      expect(_.isString(item[1])).toBe(true)
      expect(_.isBoolean(item[2])).toBe(true)
    })
  })
})