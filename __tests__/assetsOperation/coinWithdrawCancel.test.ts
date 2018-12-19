
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('coinWithdrawCancel', () => {
  test('coinWithdrawCancel', async () => {
    const res = await client.coinWithdrawCancel({
      coin: 'DAI',
      txOid: '123',
    })
    expect(res.success).toBe(false)
  })
})