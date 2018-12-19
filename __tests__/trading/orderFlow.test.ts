import * as _ from 'lodash'
import httpClient from '../../src/http'
import config from '../config'
import { symbol } from '../constants'

const client = httpClient(config)

const price = 0.000001 as any

describe('order flow', () => {
  test('order flow', async () => {
    const resForCreate = await client.createOrder({
      symbol,
      type: 'BUY',
      price,
      amount: 1,
    })
    // createOrder
    const orderOid = resForCreate.data.orderOid
    expect(_.isString(orderOid)).toBe(true)

    // listOrdersWithoutType
    const resForlistOrdersWithoutType = await client.listOrders({
      symbol,
    }) as any
    expect(_.isArray(resForlistOrdersWithoutType.data.BUY)).toBe(true)
    resForlistOrdersWithoutType.data.BUY.forEach(item => {
      expect(item.length).toBe(7)
    })

    // listOrdersWithType
    const resForlistOrdersWithType = await client.listOrders({
      symbol,
      type: 'BUY',
    }) as any
    expect(_.isArray(resForlistOrdersWithType.data)).toBe(true)
    resForlistOrdersWithType.data.forEach(item => {
      expect(item.length).toBe(7)
    })

    // listOrdersKvFormat
    const resForlistOrdersKvFormat = await client.listOrdersKvFormat({
      symbol,
      type: 'BUY',
    })
    expect(_.isArray(resForlistOrdersKvFormat.data.BUY)).toBe(true)
    resForlistOrdersKvFormat.data.BUY.forEach(item => {
      expect(_.isPlainObject(item)).toBe(true)
      expect(_.isNumber(item.price)).toBe(true)
    })

    // orderDetail
    const resForOrderDetail = await client.orderDetail({
      symbol,
      type: 'BUY',
      orderOid,
    })
    expect(resForOrderDetail.data.orderPrice).toBe(price)
    expect(resForOrderDetail.data.orderOid).toBe(orderOid)

    // cancelOrder
    const resForcancelOrder = await client.cancelOrder({
      symbol,
      orderOid,
      type: 'BUY',
    })
    expect(resForcancelOrder.success).toBe(true)

    // allOrders
    const resForallOrders = await client.listAllOrders({
      symbol,
      direction: 'BUY',
    })
    expect(_.isArray(resForallOrders.data.datas)).toBe(true)

    // create 2 orders to cancelAllOrders
    await client.createOrder({
      symbol,
      type: 'BUY',
      price,
      amount: 1,
    })
    await client.createOrder({
      symbol,
      type: 'BUY',
      price,
      amount: 1,
    })
    // cancelAllOrders
    const resForCancelAllOrders = await client.cancelAllOrders({
      symbol,
    })
    expect(resForCancelAllOrders.success).toBe(true)
  })
})