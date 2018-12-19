import * as crypto from 'crypto'
import * as clients from 'restify-clients'
import {
  TickParams,
  TickResultWithSymbolParams,
  TickResultWithNoParams,
  OrderBookParams,
  OrderBookResult,
  BuyOrSellOrderBookParams,
  BuyOrSellOrderBookResult,
  DealOrdersParams,
  DealOrdersResult,
  MarketsResult,
  SymbolsParams,
  SymbolsResult,
  CoinsTrendingParams,
  CoinsTrendingResult,
  KlineParams,
  KlineResult,
  ChartConfigResult,
  ChartSymbolsParams,
  ChartSymbolsResult,
  ChartHistoryParams,
  ChartHistoryResult,
  CoinsResult,
  CoinInfoParams,
  CoinInfoResult,
  MarketSymbolsParams,
  MarketSymbolsResult,
  StickOrFavouriteSymbolsResult,
  FavSymbolParams,
  StickSymbolParams,
  StickOrFavSymbolResult,
  CurrenciesParams,
  CurrenciesResult,
  SetCurrencyParams,
  ListLangResult,
  ChangeLangeParams,
  UserInfoResult,
  ResultBase,
  CoinDepositAddressParams,
  CoinDepositAddressResult,
  CoinWithdrawApplyParams,
  CoinWithdrawApplyResult,
  CoinWithdrawCancelParams,
  CoinWithdrawCancelResult,
  CoinRecordsParams,
  CoinRecordsResult,
  CoinBalanceParams,
  CoinBalanceResult,
  BalancesParams,
  BalancesResult,
  CreateOrderParams,
  CreateOrderResult,
  ListOrdersParams,
  ListOrdersResultWithType,
  ListOrdersResultWithoutType,
  ListOrdersKvFormatResult,
  CancelOrderParams,
  CancelAllOrdersParams,
  ListMergedDealtOrdersParams,
  ListMergedDealtOrdersResult,
  ListSymbolDealtOrdersParams,
  ListSymbolDealtOrdersResult,
  ListAllOrdersParams,
  ListAllOrdersResult,
  OrderDetailParams,
  OrderDetailResult,
} from './interface'

const BASE = 'https://api.kucoin.com'
const client = clients.createJsonClient({
  url: BASE,
})

/**
 * Build query string for uri encoded url based on json object
 */
const makeQueryString = q => {
  if (q) {
    const keys = Object.keys(q).sort((a, b) => {
      if (a > b) return 1
      if (b > a) return -1
      else return 0
    })
    return `?${keys
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(q[k])}`)
      .join('&')}`
  }
  return ''
}

export const sendResult = (client, method = 'GET', options): Promise<any> => {
  return new Promise((resolve, reject) => {
    const callback = (err, _req, _res, obj) => {
      if (err) {
        reject(err)
      } else {
        resolve(obj)
      }
    }
    if (method === 'GET') {
      client.get(options, callback)
    } else {
      client.post(options, {}, callback)
    }
  })
}

/**
 * Make public calls against the api
 *
 * @param {string} path Endpoint path
 * @param {object} data The payload to be sent
 * @returns {object} The api response
 */
const publicCall = (path, data?: Object) => {
  const queryString = data ? makeQueryString(data).substr(1) : ''
  const options = {
    path: path + (queryString ? '?' + queryString : ''),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return sendResult(client, 'GET', options)
}

const getSignature = (path, queryString, nonce, apiSecret) => {
  let strForSign = path + '/' + nonce + '/' + queryString
  let signatureStr = new Buffer(strForSign).toString('base64')
  let signatureResult = crypto.createHmac('sha256', apiSecret)
    .update(signatureStr)
    .digest('hex')
  return signatureResult
}

/**
 * Factory method for private calls against the api
 *
 * @param {string} path Endpoint path
 * @param {object} data The payload to be sent
 * @param {string} method HTTB VERB, GET by default
 * @param {object} headers
 * @returns {object} The api response
 */
const privateCall = ({ apiKey, apiSecret }) => (
  path,
  data = {} as any,
  method = 'GET',
) => {
  if (!apiKey || !apiSecret) {
    throw new Error('You need to pass an API key and secret to make authenticated calls.')
  }

  const nonce = Date.now()
  const queryString = makeQueryString(data).substr(1)
  const signature = getSignature(path, queryString, nonce, apiSecret)
  const options = {
    path: `${path + (queryString ? `?${queryString}` : '')}`,
    headers: {
      'Content-Type': 'application/json',
      'KC-API-KEY': apiKey,
      'KC-API-NONCE': nonce,
      'KC-API-SIGNATURE': signature,
    },
  }

  return sendResult(client, method, options)
}

export default opts => {
  const pCall = privateCall(opts)

  return {
    /**
     * Public Market Data
     */
    // 同 /v1/{symbol}/open/tick
    tick: (payload?: TickParams): Promise<TickResultWithSymbolParams | TickResultWithNoParams> => publicCall('/v1/open/tick', payload),
    orderBook: (payload: OrderBookParams): Promise<OrderBookResult> => publicCall('/v1/open/orders', payload),
    // orderBook 的糖果方法
    buyOrderBook: (payload: BuyOrSellOrderBookParams): Promise<BuyOrSellOrderBookResult> => publicCall('/v1/open/orders-buy', payload),
    // orderBook 的糖果方法
    sellOrderBook: (payload: BuyOrSellOrderBookParams): Promise<BuyOrSellOrderBookResult> => publicCall('/v1/open/orders-sell', payload),
    // 已处理的订单
    dealOrders: (payload: DealOrdersParams): Promise<DealOrdersResult> => publicCall('/v1/open/deal-orders', payload),
    // 作为 quote 的市场 symbol
    markets: (): Promise<MarketsResult> => publicCall('/v1/open/markets'),
    // 获取所有symbol 对应的交易对；payload 可传递对应市场 如： {market: 'USDT'}
    symbols: (payload?: SymbolsParams): Promise<SymbolsResult> => publicCall('/v1/market/open/symbols', payload),
    // 获取所有币的交易情况；payload 可传递对应市场 如： {market: 'USDT'}
    coinsTrending: (payload?: CoinsTrendingParams): Promise<CoinsTrendingResult> => publicCall('/v1/market/open/coins-trending', payload),
    kline: (payload: KlineParams): Promise<KlineResult> => publicCall('/v1/open/kline', payload),
    // 获取k线数据支持的配置
    chartConfig: (): Promise<ChartConfigResult> => publicCall('/v1/open/chart/config'),
    // 获取单独交易对的图表支持的配置
    // symbol: required enum Trading symbol, e.g. KCS-BTC
    chartSymbols: (payload: ChartSymbolsParams): Promise<ChartSymbolsResult> => publicCall('/v1/open/chart/symbols', payload),
    // symbol: required enum Trading symbol, e.g. KCS-BTC
    chartHistory: (payload: ChartHistoryParams): Promise<ChartHistoryResult> => publicCall('/v1/open/chart/history', payload),
    coins: (): Promise<CoinsResult> => publicCall('/v1/market/open/coins'),
    // 获取币种信息
    coinInfo: (payload: CoinInfoParams): Promise<CoinInfoResult> => publicCall('/v1/market/open/coin-info', payload),

    /**
     * Market Data For authrozied User
     */
    marketSymbols: (payload?: MarketSymbolsParams): Promise<MarketSymbolsResult> => pCall('/v1/market/symbols', payload),
    getStickSymbols: (): Promise<StickOrFavouriteSymbolsResult> => pCall('/v1/market/stick-symbols'),
    getFavSymbols: (): Promise<StickOrFavouriteSymbolsResult> => pCall('/v1/market/fav-symbols'),
    favSymbol: (payload: FavSymbolParams): Promise<StickOrFavSymbolResult> => pCall('/v1/market/symbol/fav', payload, 'POST'),
    stickSymbol: (payload: StickSymbolParams): Promise<StickOrFavSymbolResult> => pCall('/v1/market/symbol/stick', payload, 'POST'),

    /**
     * Currencies Plugin
     */
    getCurrencies: (payload?: CurrenciesParams): Promise<CurrenciesResult> => pCall('/v1/open/currencies', payload),
    setCurrency: (payload: SetCurrencyParams): Promise<ResultBase> => pCall('/v1/user/change-currency', payload, 'POST'),

    /**
     * Language
     */
    listLang: (): Promise<ListLangResult> => pCall('/v1/open/lang-list'),
    changeLang: (payload: ChangeLangeParams): Promise<ResultBase> => pCall('/v1/user/change-lang', payload, 'POST'),

    /**
     * User
     */
    userInfo: (): Promise<UserInfoResult> => pCall('/v1/user/info'),

    /**
     * Assets Operation
     */
    coinDepositAddress: (payload: CoinDepositAddressParams): Promise<CoinDepositAddressResult> => {
      return pCall(`/v1/account/${payload.coin}/wallet/address`)
    },
    coinWithdrawApply: (payload: CoinWithdrawApplyParams): Promise<CoinWithdrawApplyResult> => {
      return pCall(`/v1/account/${payload.coin}/withdraw/apply`, payload, 'POST')
    },
    coinWithdrawCancel: (payload: CoinWithdrawCancelParams): Promise<CoinWithdrawCancelResult> => {
      return pCall(`/v1/account/${payload.coin}/withdraw/cancel`, {
        txOid: payload.txOid,
      }, 'POST')
    },
    coinDepositWithdrawRecords: (payload: CoinRecordsParams): Promise<CoinRecordsResult> => {
      const { coin, ...restParams } = payload
      return pCall(`/v1/account/${payload.coin}/wallet/records`, restParams)
    },
    coinBalance: (payload: CoinBalanceParams): Promise<CoinBalanceResult> => pCall(`/v1/account/${payload.coin}/balance`, payload),
    balances: (payload?: BalancesParams): Promise<BalancesResult> => pCall('/v1/account/balances', payload),

    /**
     * Trading
     */
    createOrder: (payload: CreateOrderParams): Promise<CreateOrderResult> => {
      return pCall('/v1/order', payload, 'POST')
    },
    // activeOrders
    listOrders: (payload: ListOrdersParams): Promise<ListOrdersResultWithoutType | ListOrdersResultWithType> => {
      return pCall('/v1/order/active', payload)
    },
    // activeOrders
    listOrdersKvFormat: (payload: ListOrdersParams): Promise<ListOrdersKvFormatResult> => {
      return pCall('/v1/order/active-map', payload)
    },
    cancelOrder: (payload: CancelOrderParams): Promise<ResultBase> => {
      return pCall('/v1/cancel-order', payload, 'POST')
    },
    cancelAllOrders: (payload: CancelAllOrdersParams): Promise<ResultBase> => {
      return pCall('/v1/order/cancel-all', payload, 'POST')
    },
    listMergedDealtOrders: (payload?: ListMergedDealtOrdersParams): Promise<ListMergedDealtOrdersResult> => {
      return pCall('/v1/order/dealt', payload, 'GET')
    },
    listSymbolDealtOrders: (payload: ListSymbolDealtOrdersParams): Promise<ListSymbolDealtOrdersResult> => {
      return pCall('/v1/deal-orders', payload, 'GET')
    },
    listAllOrders: (payload: ListAllOrdersParams): Promise<ListAllOrdersResult> => pCall('/v1/orders', payload),
    orderDetail: (payload: OrderDetailParams): Promise<OrderDetailResult> => pCall('/v1/order/detail', payload),
  }
}