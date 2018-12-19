
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('changeLang', () => {
  test('changeLang', async () => {
    const res = await client.changeLang({
      lang: 'en_US',
    })
    expect(res.success).toBe(true)
  })
})