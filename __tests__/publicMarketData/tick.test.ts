import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

describe('tick', () => {
  test('tick no params', async () => {
    const res = await client.tick()
    expect(_.isArray(res.data)).toBe(true)
  })

  test('tick symbol params', async () => {
    const res = await client.tick({ symbol })
    expect(_.isPlainObject(res.data)).toBe(true)
  })
})