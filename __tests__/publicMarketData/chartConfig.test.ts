import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('chartConfig', () => {
  test('chartConfig', async () => {
    const res = await client.chartConfig()
    expect(_.isArray(res.supported_resolutions)).toBe(true)
  })
})