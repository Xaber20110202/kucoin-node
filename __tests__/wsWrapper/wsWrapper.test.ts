import * as _ from 'lodash'
import getWsWrapperAsync from '../../src/wsWrapper'

const symbol = 'ETH-BTC'

let wsWrapper = null as any
beforeAll(async () => {
  wsWrapper = await getWsWrapperAsync()
})

afterAll(async () => {
  wsWrapper.close()
})

describe('wsWrapper', () => {
  it('test subTrade', async () => {
    const res = await new Promise(resolve => {
      wsWrapper.subTrade(symbol, resolve)
    }) as any
    expect(['ADD', 'CANCEL'].includes(res.action)).toBe(true)
  }, 120 * 1000)

  it('test subHistory', async () => {
    const res = await new Promise(resolve => {
      wsWrapper.subHistory(symbol, resolve)
    }) as any
    expect(_.isString(res.oid)).toBe(true)
  }, 120 * 1000)

  it('test subTick', async () => {
    const res = await new Promise(resolve => {
      wsWrapper.subTick(symbol, resolve)
    }) as any
    expect(_.isString(res.coinTypePair)).toBe(true)
  }, 120 * 1000)

  it('test subTick', async () => {
    const res = await new Promise(resolve => {
      wsWrapper.subMarket('ETH', resolve)
    }) as any
    expect(_.isString(res.coinTypePair)).toBe(true)
  }, 120 * 1000)
})