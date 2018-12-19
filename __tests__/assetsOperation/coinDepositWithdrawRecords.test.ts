
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('coinDepositWithdrawRecords', () => {
  test('coinDepositWithdrawRecords', async () => {
    const res = await client.coinDepositWithdrawRecords({
      coin: 'ETH',
      type: 'DEPOSIT',
      status: 'FINISHED',
    })
    expect(_.isArray(res.data.datas)).toBe(true)
  })
})