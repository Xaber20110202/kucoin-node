import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('user', () => {
  test('user', async () => {
    const res = await client.userInfo()
    expect(res.data.email).toBeTruthy()
  })
})