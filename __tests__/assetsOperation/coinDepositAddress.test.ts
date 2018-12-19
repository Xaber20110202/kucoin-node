
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('coinDepositAddress', () => {
  test('coinDepositAddress', async () => {
    const res = await client.coinDepositAddress({
      coin: 'ETH',
    })
    expect(res.data.address).toBe('0xae1dccf88938329d92664d8bc390893333d07e42')
  })
})