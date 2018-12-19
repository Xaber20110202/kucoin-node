
import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'

const client = httpClient(config)

describe('coinWithdrawApply', () => {
  test('coinWithdrawApply', async () => {
    const res = await client.coinWithdrawApply({
      coin: 'DAI',
      amount: 1,
      address: '0xfBA2FF8436171ddD3653CD2Ca1C5595046144D7f',
    })
    expect(res.success).toBe(false)
  })
})