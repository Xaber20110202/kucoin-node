export type __Direction = 'BUY' | 'SELL'

// [Price, Amount, Volume]
export type __OrderBookItem = [number, number, number]

// Time , Order Type, Price, Amount, Deal Amount, OrderOid, something
// [1544595879000,"BUY",0.000001,1,0,"5c10a9a76cefbb2353ee68a1",0]
export type __ListOrderItem = [number, __Direction, number, number, number, string, number]

export type __ListOrderKvFormatItem = {
  oid: string
  type: __Direction
  userOid: null | string
  coinType: string
  coinTypePair: string
  direction: __Direction
  price: number
  dealAmount: number
  pendingAmount: number
  createdAt: number
  updatedAt: number,
}

export type __MarketItem = 'BTC' | 'ETH' | 'USDT' | 'NEO' | 'KCS'

export type __Resolution = '1' | '5' | '15' | '30' | '60' | '480' | 'D' | 'W'

// Timestamp, Order Type, Price, Amount, Volume, dealt id
export type __DealOrderItem = [
  number,
  __Direction,
  number,
  number,
  number,
  string
]

// Timestamp, Open, High, Low, Close, Amount, Volume
export type __KlineItem = [
  number,
  number | null,
  number | null,
  number | null,
  number | null,
  number,
  number
]

export type __SymbolOrTickItem = {
  coinType: string
  trading: boolean
  lastDealPrice: number
  buy: number
  sell: number
  coinTypePair: string
  sort: number
  feeRate: number
  volValue: number
  high: number
  datetime: number
  vol: number
  low: number
  changeRate: number
  stick?: boolean
  fav?: boolean,
}

export type __DealItem = [number, number | null]

export type __MergedDealtOrderItem = {
  createdAt: number
  amount: number
  dealValue: number
  dealPrice: number
  fee: number
  feeRate: number
  oid: string
  orderOid: string
  coinType: string
  coinTypePair: string
  direction: __Direction
  dealDirection: __Direction,
}

export type __DealtOrderItem = {
  oid: string
  dealPrice: number
  orderOid: string
  direction: __Direction
  amount: number
  dealValue: number
  createdAt: number,
}

export type __CoinsTrending = {
  coinPair: string,
  deals: __DealItem[],
}

export type __CoinInfoItem = {
  withdrawMinFee: number
  coinType: null | string
  txUrl: string
  withdrawMinAmount: number
  withdrawFeeRate: number
  confirmationCount: number
  name: string
  tradePrecision: number
  coin: string
  infoUrl: null | string
  enableWithdraw: boolean
  enableDeposit: boolean
  depositRemark: string
  withdrawRemark: string,
}

export type __CurrencyItem = [string, string]

export interface ResultBase {
  success: boolean
  code: string
  msg?: string
}

export interface TickParams {
  symbol?: string
}

export interface TickResultWithSymbolParams extends ResultBase {
  data: __SymbolOrTickItem
}

export interface TickResultWithNoParams extends ResultBase {
  data: __SymbolOrTickItem[]
}

export interface OrderBookParams {
  symbol: string
  direction?: __Direction
  group?: number
  limit?: number
}

export interface OrderBookResult extends ResultBase {
  data: {
    _comment?: string
    timestamp: number
    SELL: __OrderBookItem[]
    BUY: __OrderBookItem[],
  }
}

export interface BuyOrSellOrderBookParams {
  symbol: string
  group?: number
  limit?: number
}

export interface BuyOrSellOrderBookResult extends ResultBase {
  data: __OrderBookItem[]
}

export interface DealOrdersParams {
  symbol: string
  limit?: number
}

export interface DealOrdersResult extends ResultBase {
  _comment?: string
  data: __DealOrderItem[]
}

export interface MarketsResult extends ResultBase {
  timestamp: number
  data: string[]
}

export interface SymbolsParams {
  market?: __MarketItem
}

export interface SymbolsResult extends ResultBase {
  data: __SymbolOrTickItem[]
}

export interface CoinsTrendingParams {
  market?: __MarketItem
}

export interface CoinsTrendingResult extends ResultBase {
  data: __CoinsTrending[]
}

export interface KlineParams {
  symbol: string
  type: '1min' | '5min' | '15min' | '30min' | '1hour' | '8hour' | '1day' | '1week'
  from: number
  to: number
  limit?: string
}

export interface KlineResult extends ResultBase {
  data: __KlineItem[]
}

export interface ChartConfigResult {
  supports_marks: boolean,
  supports_time: boolean,
  supports_search: boolean,
  supports_group_request: boolean,
  supported_resolutions: __Resolution[]
}

export interface ChartSymbolsParams {
  symbol: string
}

export interface ChartSymbolsResult {
  ticker: string
  minmov: number
  minmov2: number
  session: string
  timezone: string
  has_intraday: boolean
  description: string
  supported_resolutions: __Resolution[],
  type: string
  currency_code: string
  'exchange-listed': string
  volume_precision: number
  pointvalue: number
  name: string
  'exchange-traded': string
  pricescale: number
  has_no_volume: boolean
}

export interface ChartHistoryParams {
  symbol: string
  resolution: __Resolution
  from: number
  to: number
}

export interface ChartHistoryResult {
  s: string
  c: number[]
  t: number[]
  v: number[]
  h: number[]
  l: number[]
  o: number[]
}

export interface CoinsResult extends ResultBase {
  data: __CoinInfoItem[]
}

export interface CoinInfoParams {
  coin: string
}

export interface CoinInfoResult extends ResultBase {
  data: __CoinInfoItem
}

export interface MarketSymbolsParams {
  market?: __MarketItem
  symbol?: string
  filter?: 'FAVOURITE' | 'STICK'
}

export interface MarketSymbolsResult extends ResultBase {
  data: __SymbolOrTickItem[]
}

export interface StickOrFavouriteSymbolsResult extends ResultBase {
  data: string[]
}

export interface FavSymbolParams {
  symbol: string
  // 0:remove 1:add
  fav: 0 | 1
}

export interface StickSymbolParams {
  symbol: string
  // 0:remove 1:add
  stick: 0 | 1
}

export interface StickOrFavSymbolResult extends ResultBase {
  data: null
}

export interface CurrenciesParams {
  // supports multiple coins, split by comma
  coins?: string
}

export interface CurrenciesResult extends ResultBase {
  timestamp: number
  data: {
    currencies: __CurrencyItem[],
    rates: any,
  }
}

export interface SetCurrencyParams {
  // e.g.: USD,CNY,JPY
  currency: string
}

export type __LangItem = [
  string,
  string,
  boolean
]
export interface ListLangResult extends ResultBase {
  data: __LangItem[]
}

export interface ChangeLangeParams {
  lang: string
}

export interface UserInfoResult {
  data: {
    referrer_code: string,
    photoCredentialValidated: boolean,
    videoValidated: boolean,
    language: string,
    currency: string
    oid: string
    baseFeeRate: number
    hasCredential: boolean,
    credentialNumber: string
    phoneValidated: boolean,
    phone: string
    credentialValidated: boolean,
    googleTwoFaBinding: boolean,
    nickname: null,
    name: string
    hasTradePassword: boolean,
    emailValidated: boolean,
    email: string
    loginRecord: {
      last: {
        ip: string
        context: null,
        time: number,
      },
      current: {
        ip: string
        context: null,
        time: number,
      },
    },
  }
}

export interface CoinDepositAddressParams {
  coin: string
}

export interface CoinDepositAddressResult {
  data: {
    oid: string
    address: string
    context: null,
    userOid: string
    coinType: string
    createdAt: number
    deletedAt: null | number
    updatedAt: number
    lastReceivedAt: number,
  }
}

export interface CoinWithdrawApplyParams {
  coin: string
  amount: number
  address: string
}

export interface CoinWithdrawApplyResult extends ResultBase {
  data: string
}

export interface CoinWithdrawCancelParams {
  coin: string
  txOid: string
}

export interface CoinWithdrawCancelResult extends ResultBase {
  data: null | string
}

export interface CoinRecordsParams {
  coin: string
  type?: 'DEPOSIT' | 'WITHDRAW'
  status?: 'FINISHED' | 'CANCEL' | 'PENDING'
  page?: number
}

export type __CoinRecordItem = {
  fee: 1
  oid: string
  type: string
  amount: number
  remark: string
  status: string
  address: string
  context: string
  userOid: string
  coinType: string
  createdAt: number
  deletedAt: null | number
  updatedAt: number
  outerWalletTxid: null | string,
}

export interface CoinRecordsResult extends ResultBase {
  data: {
    datas: __CoinRecordItem[],
    total: number
    limit: number
    pageNos: number
    currPageNo: number
    navigatePageNos: number[]
    coinType: string
    type: null | any
    userOid: string
    status: null | string
    firstPage: boolean
    lastPage: boolean
    startRow: boolean,
  }
}

export type __balanceItem = {
  coinType: string
  balance: number
  freezeBalance: number,
}

export interface CoinBalanceParams {
  coin: string
}

export interface CoinBalanceResult extends ResultBase {
  data: __balanceItem
}

export interface BalancesParams {
  limit?: number
  page?: number
}

export interface BalancesResult extends ResultBase {
  data: {
    datas: __balanceItem[],
    currPageNo: number,
    limit: number,
    pageNos: number,
  }
}

export interface CreateOrderParams {
  symbol: string
  type: __Direction
  price: number
  amount: number
}

export interface CreateOrderResult extends ResultBase {
  data: {
    orderOid: string,
  }
}

export interface ListOrdersParams {
  symbol: string
  type?: __Direction
}

export interface ListOrdersResultWithoutType extends ResultBase {
  data: {
    SELL?: __ListOrderItem[],
    BUY?: __ListOrderItem[],
  }
}
export interface ListOrdersResultWithType extends ResultBase {
  data:  __ListOrderItem[],
}

export interface ListOrdersKvFormatResult extends ResultBase {
  timestamp?: number
  data: {
    SELL?: __ListOrderKvFormatItem[],
    BUY?: __ListOrderKvFormatItem[],
  }
}

export interface CancelOrderParams {
  symbol: string
  orderOid: string
  type: __Direction
}

export interface CancelAllOrdersParams {
  symbol: string
  type?: __Direction
}

export interface ListMergedDealtOrdersParams {
  symbol?: string
  type?: __Direction
  // when symbol is empty, then page * limit Can not exceed 100; and when symbol is not empty, then limit Can not exceed 20
  limit?: number
  page?: number
  since?: number
  before?: number
}

export interface ListMergedDealtOrdersResult extends ResultBase {
  timestamp: number
  data: {
    total: number
    datas: __MergedDealtOrderItem[]
    limit: number
    page: number,
  }
}

export interface ListSymbolDealtOrdersParams {
  symbol: string
  type?: __Direction
  limit?: number
  page?: number
}

export interface ListSymbolDealtOrdersResult extends ResultBase {
  timestamp: number
  data: {
    datas: __DealtOrderItem[],
    total: number
    limit: number
    pageNos: number
    currPageNo: number
    navigatePageNos: number[],
    userOid: string
    direction: __Direction
    startRow: number
    firstPage: boolean
    lastPage: boolean,
  }
}

export interface ListAllOrdersParams {
  symbol: string
  direction: __Direction
  // default false
  active?: boolean
  limit?: number
  page?: number
  since?: number
  before?: number
}

export type __AllOrderItem = {
  oid: string
  userOid: string
  coinType: string
  coinTypePair: string
  direction: __Direction
  price: number
  dealAmount: number
  pendingAmount: number
  createdAt: string
  updatedAt: string,
}

export interface ListAllOrdersResult extends ResultBase {
  timestamp: string
  data: {
    datas: __AllOrderItem[]
    total: number
    limit: number
    pageNos: number
    currPageNo: number
    navigatePageNos: number[],
    userOid: string
    oid: string | null
    since: any
    before: any
    firstPage: boolean
    lastPage: boolean
    startRow: number,
  }
}

export interface OrderDetailParams {
  symbol: string
  type: __Direction
  orderOid: string
  limit?: number
  page?: number
}

export type __OrderDetailDealOrderItem = {
  amount: number
  dealValue: number
  fee: number
  dealPrice: number
  feeRate: number,
}

export interface OrderDetailResult extends ResultBase {
  timestamp: number
  data: {
    coinType: string
    dealValueTotal: number
    dealPriceAverage: number
    feeTotal: number
    userOid: number
    dealAmount: number
    dealOrders: {
      total: number
      firstPage: boolean
      lastPage: boolean
      datas: __OrderDetailDealOrderItem[],
      currPageNo: number
      limit: number
      pageNos: number,
    },
    coinTypePair: string
    orderPrice: number
    type: __Direction
    orderOid: string
    pendingAmount: number
    isActive: boolean,
  }
}

export interface SubTradeResult {
  type: __Direction
  action: 'ADD' | 'CANCEL'
  time: number
  price: number
  count: number
  volume: number
}

export interface SubHistoryResult {
  oid: string
  price: number
  count: number
  time: number
  direction: __Direction
  volValue: number
}

export interface SubTickOrMarketResult {
  coinType: string
  trading: boolean
  symbol: string
  lastDealPrice: number
  buy: number
  sell: number
  change: number
  coinTypePair: string
  sort: number
  feeRate: number
  volValue: number
  high: number
  datetime: number
  vol: number
  low: number
  changeRate: number
}