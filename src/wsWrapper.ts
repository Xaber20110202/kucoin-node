import * as clients from 'restify-clients'
import * as _ from 'lodash'
import * as WebSocket from 'ws'
import { sendResult } from './http'
import {
  SubTradeResult,
  SubHistoryResult,
  SubTickOrMarketResult,
 } from './interface'

class WsWrapper {
  id: string
  ws: WebSocket

  constructor(props) {
    this.id = props.id
    this.ws = props.ws
  }

  private topicStacks = {}

  onmessage (data) {
    if (data.topic) {
      const topic = data.topic
      if (this.topicStacks[topic]) {
        const callbacks = this.topicStacks[topic]
        callbacks.forEach((callback) => {
          callback(data.data)
        })
      }
    }
  }

  private subscribe(topic, callback, req?: 0 | 1) {
    if (this.topicStacks[topic]) {
      this.topicStacks[topic].push(callback)
    } else {
      this.topicStacks[topic] = [callback]
    }
    this.ws.send(JSON.stringify({
      id: this.id,
      type: 'subscribe',
      topic,
      req: req ? 1 : 0,
    }))
  }

  private unsubscribe(topic, req?: 0 | 1) {
    if (this.topicStacks[topic]) {
      this.topicStacks[topic] = undefined
      this.ws.send(JSON.stringify({
        id: this.id,
        type: 'unsubscribe',
        topic,
        req: req ? 1 : 0,
      }))
    }
  }

  close() {
    this.ws.close()
  }

  subTrade(symbol, callback: (data?: SubTradeResult) => any) {
    this.subscribe(`/trade/${symbol}_TRADE`, callback)
  }
  subHistory(symbol, callback: (data?: SubHistoryResult) => any) {
    this.subscribe(`/trade/${symbol}_HISTORY`, callback)
  }
  subTick(symbol, callback: (data?: SubTickOrMarketResult) => any) {
    this.subscribe(`/market/${symbol}_TICK`, callback)
  }
  subMarket(marketName, callback: (data?: SubTickOrMarketResult) => any) {
    this.subscribe(`/market/${marketName}`, callback)
  }

  unsubTrade(symbol) {
    this.unsubscribe(`/trade/${symbol}_TRADE`)
  }
  unsubHistory(symbol) {
    this.unsubscribe(`/trade/${symbol}_HISTORY`)
  }
  unsubTick(symbol) {
    this.unsubscribe(`/market/${symbol}_TICK`)
  }
  unsubMarket(marketName) {
    this.unsubscribe(`/market/${marketName}`)
  }
}

export default async (): Promise<WsWrapper> => {
  const client = clients.createJsonClient({
    url: 'https://kitchen.kucoin.com',
  })
  const options = {
    path: '/v1/bullet/usercenter/loginUser?protocol=websocket&encrypt=true',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const loginUserRes = await sendResult(client, 'GET', options)
  const loginUserData = loginUserRes.data
  const bulletToken = loginUserData.bulletToken
  let instanceServer = null

  instanceServer = loginUserData.instanceServers.find(item => item.userType === 'normal')
  instanceServer = instanceServer || loginUserRes.instanceServers[0]

  const ws = new WebSocket(`${instanceServer.endpoint}?bulletToken=${encodeURIComponent(bulletToken)}&format=json&resource=api`)
  let wsWrapper = null as WsWrapper

  return new Promise((resolve, reject) => {
    ws.on('open', () => {
      ws.on('message', (data) => {
        const obj = JSON.parse(data)
        if (wsWrapper) {
          wsWrapper.onmessage(obj)

        } else {
          wsWrapper = new WsWrapper({
            id: obj.id,
            ws: ws,
          })
          resolve(wsWrapper)
        }
      })
    })

    ws.on('error', (err) => {
      reject(err)
    })
  })
}