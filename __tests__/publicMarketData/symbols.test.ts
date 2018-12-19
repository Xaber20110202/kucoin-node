import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('symbols', () => {
  test('symbols', async () => {
    const res = await client.symbols()
    expect(_.isArray(res.data)).toBe(true);

    (res.data as any).forEach(item => {
      expect(_.isPlainObject(item)).toBe(true)
    })
  })
})