# kucoin-api-node

A complete API wrapper for the [Kucoin API](https://kucoinapidocs.docs.apiary.io/#).

*Read this in other languages: [English](README.md), [简体中文](README.zh-CN.md).*

## Installation
```bash
yarn add kucoin-api-node
```

## Getting started
```typescript
import Kucoin from 'kucoin-api-node'

const client = await Kucoin()

// Authenticated client, can make signed calls
const client2 = await Kucoin({
  apiKey: 'xxx',
  apiSecret: 'xxx',
})
```

## Table of Contents
* [Public Market Data](#public-market-data)
  * [tick](#tick)
  * [orderBook](#orderBook)
  * [buyOrderBook](#buyOrderBook)
  * [sellOrderBook](#sellOrderBook)
  * [dealOrders](#dealOrders)
  * [markets](#markets)
  * [symbols](#symbols)
  * [coinsTrending](#coinsTrending)
  * [kline](#kline)
  * [chartConfig](#chartConfig)
  * [chartSymbols](#chartSymbols)
  * [chartHistory](#chartHistory)
  * [coins](#coins)
  * [coinInfo](#coinInfo)
* [Market Data For authrozied User](#Market-Data-For-authrozied-User)
  * [marketSymbols](#marketSymbols)
  * [getStickSymbols](#getStickSymbols)
  * [getFavSymbols](#getFavSymbols)
  * [favSymbol](#favSymbol)
  * [stickSymbol](#stickSymbol)
* [Currencies Plugin](#Currencies-Plugin)
  * [getCurrencies](#getCurrencies)
  * [setCurrency](#setCurrency)
* [Language](#Language)
  * [listLang](#listLang)
  * [changeLang](#changeLang)
* [User](#User)
  * [userInfo](#userInfo)
* [Assets Operation](#Assets-Operation)
  * [coinDepositAddress](#coinDepositAddress)
  * [coinWithdrawApply](#coinWithdrawApply)
  * [coinWithdrawCancel](#coinWithdrawCancel)
  * [coinDepositWithdrawRecords](#coinDepositWithdrawRecords)
  * [coinBalance](#coinBalance)
  * [balances](#balances)
* [Trading](#Trading)
  * [createOrder](#createOrder)
  * [listOrders](#listOrders)
  * [listOrdersKvFormat](#listOrdersKvFormat)
  * [cancelOrder](#cancelOrder)
  * [cancelAllOrders](#cancelAllOrders)
  * [listMergedDealtOrders](#listMergedDealtOrders)
  * [listSymbolDealtOrders](#listSymbolDealtOrders)
  * [listAllOrders](#listAllOrders)
  * [orderDetail](#orderDetail)
* [Websocket](#Websocket)
  * [subTrade](#subTrade)
  * [subHistory](#subHistory)
  * [subTick](#subTick)
  * [subMarket](#subMarket)
  * [unsubTrade](#unsubTrade)
  * [unsubHistory](#unsubHistory)
  * [unsubTick](#unsubTick)
  * [unsubMarket](#unsubMarket)
  * [close](#close)

### Public Market Data

#### tick
```typescript
console.log(await client.tick())

console.log(await client.tick({ symbol: 'ETH-BTC' }))
```

|Param|Type|Required|
|--- |--- |--- |
|symbol|String|false|

<details>
<summary>Output</summary>

```typescript
// await client.tick()
// result with no symbol params
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545103711594,
  "data": [
    {
      "coinType": "AVA",
      "trading": true,
      "symbol": "AVA-BTC",
      "lastDealPrice": 0.00003783,
      "buy": 0.00003732,
      "sell": 0.00003785,
      "change": -0.00000273,
      "coinTypePair": "BTC",
      "sort": 100,
      "feeRate": 0.001,
      "volValue": 1.55621544,
      "high": 0.00004123,
      "datetime": 1545103708000,
      "vol": 38736.7174,
      "low": 0.00003778,
      "changeRate": -0.0673
    },
    // ...
  ]
}

// await client.tick({ symbol: 'ETH-BTC' })
// result with symbol params
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545103980557,
  "data": {
    "coinType": "ETH",
    "trading": true,
    "symbol": "ETH-BTC",
    "lastDealPrice": 0.02669364,
    "buy": 0.02669364,
    "sell": 0.02669638,
    "change": 0.00039885,
    "coinTypePair": "BTC",
    "sort": 100,
    "feeRate": 0.001,
    "volValue": 180.59080483,
    "high": 0.02714736,
    "datetime": 1545103980000,
    "vol": 6793.2601081,
    "low": 0.02617095,
    "changeRate": 0.0152
  }
}
```

</details>

#### orderBook

```typescript
console.log(await client.orderBook({ symbol: 'ETH-BTC' }))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol|String|true|
|group|Number|false|
|limit|Number|false|
|direction|String|false|`BUY`, `SELL`|

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545104255936,
  "data": {
    "SELL": [
      [
        0.0266998, // Price
        2.9967694, // Amount
        0.08001314 // Volume
      ],
      // ...
    ],
    "BUY": [
      [
        0.02668585,
        0.1682178,
        0.00448903
      ],
      // ...
    ],
    "timestamp": 1545104255297
  }
}
```

</details>

#### buyOrderBook
```typescript
console.log(await client.buyOrderBook({ symbol: 'ETH-BTC' }))
```

|Param|Type|Required|
|--- |--- |--- |
|symbol|String|true|
|group|Number|false|
|limit|Number|false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545104546442,
  "data": [
    [
      0.02669045, // Price
      0.0257827,  // Amount
      0.00068815  // Volume
    ],
    // ...
  ]
}
```

</details>

#### sellOrderBook
```typescript
console.log(await client.sellOrderBook({ symbol: 'ETH-BTC' }))
```

|Param|Type|Required|
|--- |--- |--- |
|symbol|String|true|
|group|Number|false|
|limit|Number|false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545104639623,
  "data": [
    [
      0.0267078,  // Price
      26.031386,  // Amount
      0.69524105  // Volume
    ],
    // ...
  ]
}
```
</details>

#### dealOrders

```typescript
console.log(await client.dealOrders({ symbol: 'ETH-BTC' }))
```

|Param|Type|Required|Default|Description|
|--- |--- |--- |--- |--- |
|symbol|String|true| |
|limit|Number|false|10|min:10, max:50|

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545104886496,
  "data": [
    [
      1545104801000, // Timestamp
      "SELL",       // Order Type
      0.02672161,   // Price
      0.0019353,    //  Amount
      0.00005171,   // Volume
      "5c186da19dda152cf9d915df" // dealt id
    ],
    // ...
  ]
}
```
</details>

#### markets
```typescript
console.log(await client.markets())
```

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545105668040,
  "data": [
    "BTC",
    "ETH",
    "KCS",
    "USDT",
    "TUSD",
    "PAX",
    "USDC",
    "DAI",
    "NEO"
  ]
}
```
</details>

#### symbols
```typescript
console.log(await client.symbols({ market: 'DAI' }))
```

|Param|Type|Required|Default|
|--- |--- |--- |--- |
|market|String|false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545105768025,
  "data": [
    {
      "coinType": "BTC",
      "trading": true,
      "symbol": "BTC-DAI",
      "lastDealPrice": 3474.3127,
      "buy": 3507.4695,
      "sell": 3550.328,
      "change": 279.3126,
      "coinTypePair": "DAI",
      "sort": 100,
      "feeRate": 0.001,
      "volValue": 2393480.42540665,
      "high": 4200,
      "datetime": 1545105766000,
      "vol": 745.06161769,
      "low": 3100,
      "changeRate": 0.0874,
      "plus": true
    },
    // ...
  ]
}
```
</details>

#### coinsTrending
```typescript
console.log(await client.coinsTrending({ market: 'DAI' }))
```

|Param|Type|Required|
|--- |--- |--- |
|market|String|false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545105920439,
  "data": [
    {
      "coinPair": "BTC-DAI",
      "deals": [
        [
          1545105600000,
          null
        ],
        [
          1545102000000,
          null
        ],
        [
          1545098400000,
          null
        ],
        [
          1545094800000,
          3474.3127
        ],
        // ...
      ]
    },
    // ...
  ]
}
```
</details>

#### kline
```typescript
console.log(await client.kline({
  symbol: 'ETH-BTC',
  type: '1min',
  from: 1541000000,
  to: 1541001600,
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol|String|true|
|type|String|true|`1min`, `5min`, `15min`, `30min`, `1hour`, `8hour`, `1day`, `1week`|
|from|Number|true|
|to|Number|true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545106140791,
  "data": [
    [
      1541000040000, // Timestamp
      0.03110137, // Open
      0.03116284, // High
      0.03110137, // Low
      0.03115191, // Close
      94.8907595, // Amount
      2.95680661 // Volume
    ],
    // ...
  ]
}
```
</details>

#### chartConfig
```typescript
console.log(await client.chartConfig()
```

<details>
<summary>Output</summary>

```typescript
{
  "supports_marks": false,
  "supports_time": true,
  "supports_search": true,
  "supports_group_request": false,
  "supported_resolutions": [
    "1",
    "5",
    "15",
    "30",
    "60",
    "480",
    "D",
    "W"
  ]
}
```
</details>

#### chartSymbols
```typescript
console.log(await client.chartSymbols({ symbol: 'ETH-BTC' }))
```

|Param|Type|Required|
|--- |--- |--- |
|symbol|String|true|

<details>
<summary>Output</summary>

```typescript
{
  "ticker": "ETH-BTC",
  "minmov2": 0,
  "session": "24x7",
  "timezone": "Asia/Shanghai",
  "has_intraday": true,
  "description": "ETH-BTC",
  "supported_resolutions": [
    "1",
    "5",
    "15",
    "30",
    "60",
    "480",
    "D",
    "W"
  ],
  "type": "stock",
  "currency_code": "BTC",
  "exchange-listed": "",
  "volume_precision": 8,
  "pointvalue": 1,
  "name": "ETH-BTC",
  "exchange-traded": "",
  "minmov": 1,
  "pricescale": 100000000,
  "has_no_volume": true
}
```
</details>

#### chartHistory
```typescript
console.log(await client.chartHistory({
  symbol: 'ETH-BTC',
  resolution: '1',
  from: 1541000000,
  to: 1541001600,
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol|String|true|
|resolution|String|true|`1`, `5`, `15`, `30`, `60`, `480`, `D`, `W`|
|from| Number|true|
|to| Number|true|


<details>
<summary>Output</summary>

```typescript
{
  "s": "ok",
  "c": [
    0.03118,
    // ...
  ],
  "t": [
    1541001600,
    // ...
  ],
  "v": [
    173.4787411,
    // ...
  ],
  "h": [
    0.031242,
    // ...
  ],
  "l": [
    0.03107551,
    // ...
  ],
  "o": [
    0.03119019,
    // ...
  ]
}
```
</details>

#### coins
```typescript
console.log(await client.coins())
```

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545114974522,
  "data": [
    {
      "withdrawMinFee": 0.01,
      "coinType": "ETH",
      "withdrawMinAmount": 0.02,
      "withdrawRemark": "Please ensure the address is not a smart contract address as KuCoin currently does not support contract transfer. 请确保您输入的地址不是智能合约地址，KuCoin不支持转账到智能合约地址。",
      "orgAddress": null,
      "txUrl": "https://etherscan.io/tx/{txId}",
      "userAddressName": null,
      "withdrawFeeRate": 0.001,
      "confirmationCount": 12,
      "infoUrl": null,
      "enable": true,
      "name": "Ethereum",
      "tradePrecision": 7,
      "depositRemark": null,
      "enableWithdraw": true,
      "enableDeposit": true,
      "coin": "ETH"
    },
    // ...
  ]
```
</details>

#### coinInfo
```typescript
console.log(await client.coinInfo({ coin: 'ETH' }))
```

|Param|Type|Required|
|--- |--- |--- |
|coin|String|true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545115039447,
  "data": {
    "withdrawMinFee": 0.01,
    "coinType": "ETH",
    "withdrawMinAmount": 0.02,
    "withdrawRemark": "Please ensure the address is not a smart contract address as KuCoin currently does not support contract transfer. 请确保您输入的地址不是智能合约地址，KuCoin不支持转账到智能合约地址。",
    "orgAddress": null,
    "txUrl": "https://etherscan.io/tx/{txId}",
    "userAddressName": null,
    "withdrawFeeRate": 0.001,
    "confirmationCount": 12,
    "infoUrl": null,
    "enable": true,
    "name": "Ethereum",
    "tradePrecision": 7,
    "depositRemark": null,
    "enableWithdraw": true,
    "enableDeposit": true,
    "coin": "ETH"
  }
}
```
</details>

### Market Data For authrozied User

#### marketSymbols

```typescript
console.log(await client.marketSymbols())
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|market|String|false|
|symbol|String| false|
|filter|String|false|`FAVOURITE`, `STICK`|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545118969802,
  "data": [
    {
      "coinType": "ETH",
      "trading": true,
      "symbol": "ETH-BTC",
      "lastDealPrice": 0.02673282,
      "buy": 0.0266947,
      "sell": 0.02671749,
      "change": 0.00045406,
      "coinTypePair": "BTC",
      "sort": 100,
      "feeRate": 0.001,
      "volValue": 195.28548249,
      "high": 0.02714736,
      "datetime": 1545118968000,
      "vol": 7339.2065078,
      "low": 0.02617095,
      "changeRate": 0.0173,
      "stick": false,
      "fav": true,
      "plus": true
    },
    // ...
  ]
}
```
</details>

#### getStickSymbols

```typescript
console.log(await client.getStickSymbols())
```

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545118143781,
  "data": [
    "SNT-ETH",
    // ...
  ]
}
```
</details>

#### getFavSymbols

```typescript
console.log(await client.getFavSymbols())
```

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545118330372,
  "data": [
    "ETH-BTC",
    // ...
  ]
}
```
</details>

#### favSymbol
```typescript
console.log(await client.favSymbol({
  symbol: 'ETH-BTC',
  fav: 1,
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol|String|true|
|fav|Number|true|`0`, `1` (0:remove 1:add)|

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545118256503,
  "data": null
}
```
</details>

#### stickSymbol
```typescript
console.log(await client.stickSymbol({
  symbol: 'SNT-BTC',
  stick: 0,
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol|String|true|
|stick|Number|true|`0`, `1` (0:remove 1:add)|

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545118433554,
  "data": null
}
```
</details>

### Currencies Plugin

#### getCurrencies
```typescript
console.log(await client.getCurrencies())

console.log(await client.getCurrencies({
  coins: 'BTC,ETH'
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|coins|String|false|supports multiple coins, split by comma|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545119695494,
  "data": {
    "rates": {
      "EXY": {
        "CHF": 0.04,
        "HRK": 0.26,
        "MXN": 0.82,
        "ZAR": 0.59,
        "INR": 2.94,
        "CNY": 0.28,
        "THB": 1.34,
        "AUD": 0.05,
        "ILS": 0.15,
        "KRW": 46.49,
        "JPY": 4.64,
        "PLN": 0.15,
        "GBP": 0.03,
        "IDR": 600.29,
        "HUF": 11.73,
        "PHP": 2.17,
        "TRY": 0.22,
        "RUB": 2.74,
        "HKD": 0.32,
        "EUR": 0.03,
        "DKK": 0.27,
        "USD": 0.04,
        "CAD": 0.05,
        "MYR": 0.17,
        "BGN": 0.07,
        "NOK": 0.35,
        "RON": 0.16,
        "SGD": 0.05,
        "CZK": 0.93,
        "SEK": 0.37,
        "NZD": 0.06,
        "BRL": 0.16
      },
      "IOTX": {
        "CHF": 0,
        "HRK": 0.05,
        "MXN": 0.15,
        "ZAR": 0.11,
        "INR": 0.55,
        "CNY": 0.05,
        "THB": 0.25,
        "AUD": 0.01,
        "ILS": 0.02,
        "KRW": 8.8,
        "JPY": 0.87,
        "PLN": 0.02,
        "GBP": 0,
        "IDR": 113.74,
        "HUF": 2.22,
        "PHP": 0.41,
        "TRY": 0.04,
        "RUB": 0.52,
        "HKD": 0.06,
        "EUR": 0,
        "DKK": 0.05,
        "USD": 0,
        "CAD": 0.01,
        "MYR": 0.03,
        "BGN": 0.01,
        "NOK": 0.06,
        "RON": 0.03,
        "SGD": 0.01,
        "CZK": 0.17,
        "SEK": 0.07,
        "NZD": 0.01,
        "BRL": 0.03
      },
      // ...
    },
    "currencies": [
      [
        "USD",
        "$"
      ],
      [
        "EUR",
        "€"
      ],
      // ...
    ]
  }
}
```
</details>

#### setCurrency
```typescript
console.log(await client.setCurrency({ currency: 'USD' }))
```

|Param|Type|Required|
|--- |--- |--- |
|currency|String|true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545187964360,
  "data": null
}
```
</details>

### Language

#### listLang
```typescript
console.log(await client.listLang())
```

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545188025647,
  "data": [
    [
      "en_US",
      "English",
      true
    ],
    // ...
  ]
}
```
</details>

#### changeLang

```typescript
console.log(await client.changeLang({
  lang: 'en_US',
}))
```


|Param|Type|Required|
|--- |--- |--- |
|lang|String|true|

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545188149960,
  "data": null
}
```
</details>

### User

#### userInfo
```typescript
console.log(await client.userInfo())
```

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545189118876,
  "data": {
    "companyKyc": "unsubmitted",
    "referrer_code": "aH6v5f",
    "photoCredentialValidated": false,
    "baseBonusRate": 1,
    "language": "en_US",
    "csrf": "MzE5NcBlLTE1NDUyNzU2MTg=",
    "loginRecord": {
      "current": {
        "country": "United States",
        "city": "Ann Arbor",
        "ip": "35.231.190.140",
        "context": "Chrome Mac OS X",
        "time": 1545035799000
      },
      "last": {
        "country": "United States",
        "city": "Ann Arbor",
        "ip": "35.236.121.162",
        "context": "Chrome Mac OS X",
        "time": 1545025399000
      }
    },
    "oid": "5c0e18686f601f11dab98435",
    "baseFeeRate": 1,
    "hasCredential": true,
    "credentialStatus": "NEW",
    "userKyc": "unsubmitted",
    "phoneValidated": true,
    "credentialValidated": false,
    "googleTwoFaBinding": true,
    "nickname": null,
    "currency": "USD",
    "email": "email@email.com",
    "videoValidated": false,
    "phone": "",
    "hasSecurityQuestion": true,
    "name": "",
    "hasTradePassword": false,
    "emailValidated": true,
    "isChinaVisitor": false,
    "isSuspend": false,
    "safeWords": null
  }
}
```
</details>

### Assets Operation

#### coinDepositAddress
```typescript
console.log(await client.coinDepositAddress({
  coin: 'ETH',
}))
```

|Param|Type|Required|
|--- |--- |--- |
|coin|String|true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545189369810,
  "data": {
    "oid": "xxxxx",
    "address": "xxxxx",
    "context": null,
    "userOid": "xxxxx",
    "coinType": "ETH",
    "createdAt": 1544510955000,
    "deletedAt": null,
    "updatedAt": 1544510955000,
    "lastReceivedAt": 1544511731000
  }
}
```
</details>

#### coinWithdrawApply
```typescript
console.log(await client.coinWithdrawApply({
  coin: 'DAI',
  amount: 10,
  address: '0xae1dccf88938329d92664d8bc390893333d07e42',
}))
```

|Param|Type|Required|
|--- |--- |--- |
|coin|String|true|
|amount|Number|true|
|address|String|true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545189814288,
  "data": null
}
```
</details>

#### coinWithdrawCancel
```typescript
console.log(await client.coinWithdrawCancel({
  coin: 'ETH',
  txOid: '5cxxxxxxxxxxdb04a1674f3e',
}))
```

|Param|Type|Required|
|--- |--- |--- |
|coin|String|true|
|txOid|String|true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545189814288,
  "data": null
}
```
</details>

#### coinDepositWithdrawRecords
```typescript
console.log(await client.coinDepositWithdrawRecords({
  coin: 'ETH',
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|coin|String|true|
|type|String|false|`DEPOSIT`, `WITHDRAW`|
|status|String|false|`FINISHED`, `CANCEL`, `PENDING`|
|page | Number| false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545189913039,
  "data": {
    "total": 1,
    "firstPage": true,
    "lastPage": false,
    "datas": [
      {
        "coinType": "ETH",
        "createdAt": 1545189814000,
        "amount": 0.1,
        "address": "xxxxxxxxxx",
        "fee": 0.01,
        "outerWalletTxid": "xxxxxxxxxx",
        "remark": null,
        "oid": "xxxxxxxxxx",
        "confirmation": 0,
        "type": "WITHDRAW",
        "status": "SUCCESS",
        "updatedAt": 1545189826000
      },
      // ...
    ],
    "currPageNo": 1,
    "limit": 12,
    "pageNos": 1
  }
}
```
</details>

#### coinBalance
```typescript
console.log(await client.coinBalance({
  coin: 'ETH',
}))
```

|Param|Type|Required|
|--- |--- |--- |
|coin|String|true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545190392703,
  "data": {
    "coinType": "ETH",
    "balanceStr": "0.21",
    "freezeBalance": 0,
    "balance": 0.21,
    "freezeBalanceStr": "0.0"
  }
}
```
</details>

#### balances
```typescript
console.log(await client.balances())
```

|Param|Type|Required|
|--- |--- |--- |
|limit| Number|false|
|page| Number|false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545190498576,
  "data": {
    "total": 220,
    "datas": [
      {
        "coinType": "ETH",
        "balanceStr": "0.21",
        "freezeBalance": 0,
        "balance": 0.21,
        "freezeBalanceStr": "0.0"
      },
      // ...
    ],
    "currPageNo": 1,
    "limit": 12,
    "pageNos": 19
  }
}
```
</details>

### Trading
#### createOrder
```typescript
console.log(await client.createOrder({
  symbol: 'SNT-ETH',
  type: 'BUY',
  price: 0.000001,
  amount: 1,
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol|String|true|
|type|String|true|`BUY`, `SELL`|
|price| Number|true|
|amount| Number|true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "OK",
  "timestamp": 1545190958446,
  "data": {
    "orderOid": "xxxxxxxxxxxxxxx"
  }
}
```
</details>

#### listOrders
```typescript
const resForlistOrdersWithoutType = await client.listOrders({
  symbol: 'SNT-ETH',
})

const resForlistOrdersWithType = await client.listOrders({
  symbol: 'SNT-ETH',
  type: 'BUY',
})
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol|String|true|
|type|String| false|`BUY`, `SELL`|

<details>
<summary>Output</summary>

```typescript
// resForlistOrdersWithoutType
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545190958741,
  "data": {
    "SELL": [],
    "BUY": [
      [
        1545190958000,  // Time 
        "BUY",  // Order Type
        0.000001, // Price
        1,  // Amount
        0,  // Deal Amount
        "xxxxxxxxxx", // OrderOid
        0 // something
      ],
      // ...
    ]
  }
}

// resForlistOrdersWithType
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545190959008,
  "data": [
    [
      1545190958000,  // Time 
      "BUY",  // Order Type
      0.000001, // Price
      1,  // Amount
      0,  // Deal Amount
      "xxxxxxxxxx", // OrderOid
      0 // something
    ],
    // ...
  ]
}
```
</details>

#### listOrdersKvFormat
```typescript
const resForlistOrdersKvFormat = await client.listOrdersKvFormat({
  symbol: 'SNT-ETH',
  type: 'BUY',
})
console.log(resForlistOrdersKvFormat)
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol|String|true|
|type|String| false|`BUY`, `SELL`|

<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545190959267,
  "data": {
    "BUY": [
      {
        "oid": "xxxxxxxx",
        "userOid": "xxxxxxxx",
        "coinType": "SNT",
        "coinTypePair": "ETH",
        "direction": "BUY",
        "price": 0.000001,
        "dealAmount": 0,
        "pendingAmount": 1,
        "dealValue": 0,
        "dealAveragePrice": 0,
        "createdAt": 1545190958000,
        "updatedAt": 1545190958000
      },
      // ...
    ]
  }
}
```
</details>

#### cancelOrder
```typescript
console.log(await client.cancelOrder({
  symbol: 'SNT-ETH',
  orderOid: 'xxxxxxxx',
  type: 'BUY',
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol| String|true|
|type| String | true|`BUY`, `SELL`|
|orderOid| String| true|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Cancellation Submitted",
  "timestamp": 1545190959770,
  "data": null
}
```
</details>

#### cancelAllOrders
```typescript
console.log(await client.cancelAllOrders({
  symbol: 'SNT-ETH',
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol| String|true|
|type| String | false|`BUY`, `SELL`|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Cancellation Submitted",
  "timestamp": 1545190960869,
  "data": null
}
```
</details>

#### listMergedDealtOrders
```typescript
const listMergedDealtOrders = await client.listMergedDealtOrders()

const listMergedDealtOrdersWithSymbolParams = await client.listMergedDealtOrders({
  symbol,
})
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol| String| false|
|type| String|false|`BUY`, `SELL`|
|limit| Number|false|symbol is empty, then page * limit Can not exceed 100; and when symbol is not empty, then limit Can not exceed 20|
|page| Number|false|
|since| Number|false|
|before| Number|false|


<details>
<summary>Output</summary>

```typescript
// listMergedDealtOrders
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545192189254,
  "data": {
    "total": 0,
    "datas": [],
    "limit": 12,
    "page": 1
  }
}

// listMergedDealtOrdersWithSymbolParams 
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545192189542,
  "data": {
    "total": 0,
    "firstPage": true,
    "lastPage": false,
    "datas": [],
    "currPageNo": 1,
    "limit": 12,
    "pageNos": 1
  }
}
```
</details>

#### listSymbolDealtOrders
```typescript
console.log(await client.listSymbolDealtOrders({
  symbol: 'SNT-ETH',
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol| String|true|
|type| String|false|`BUY`, `SELL`|
|limit| Number|false|
|page| Number|false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545192587885,
  "data": {
    "total": 0,
    "firstPage": true,
    "lastPage": false,
    "datas": [],
    "currPageNo": 1,
    "limit": 12,
    "pageNos": 1
  }
}
```
</details>

#### listAllOrders
```typescript
console.log(await client.listAllOrders({
  symbol,
  direction: 'BUY',
}))
```

|Param|Type|Required|Default|Description|
|--- |--- |--- |--- |--- |
|symbol| String| true|
|direction| String| true| |`BUY`, `SELL`|
|active| Boolean| false| false|
|limit| Number|false |
|page| Number| false|
|since| Number| false|
|before| Number| false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545190960027,
  "data": {
    "datas": [
      {
        "oid": "xxxxxxxx",
        "userOid": null,
        "coinType": "SNT",
        "coinTypePair": "ETH",
        "direction": "BUY",
        "price": 0.000001,
        "dealAmount": 0,
        "pendingAmount": 1,
        "dealValue": null,
        "dealAveragePrice": 0,
        "createdAt": 1545036326000,
        "updatedAt": null
      },
      // ...
    ],
    "total": 117,
    "limit": 12,
    "pageNos": 10,
    "currPageNo": 1,
    "navigatePageNos": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "userOid": "xxxxxxxx",
    "oid": null,
    "since": null,
    "before": null,
    "startRow": 0,
    "firstPage": true,
    "lastPage": false
  }
}
```
</details>

#### orderDetail
```typescript

console.log(await client.orderDetail({
  symbol: 'SNT-ETH',
  type: 'BUY',
  orderOid: 'xxxxxx',
}))
```

|Param|Type|Required|Description|
|--- |--- |--- |--- |
|symbol| String|true|
|type| String | true|`BUY`, `SELL`|
|orderOid| String| true|
|limit | Number | false|
|page| Number | false|


<details>
<summary>Output</summary>

```typescript
{
  "success": true,
  "code": "OK",
  "msg": "Operation succeeded.",
  "timestamp": 1545190959517,
  "data": {
    "coinType": "SNT",
    "dealValueTotal": 0,
    "feeTotal": 0,
    "userOid": "xxxxxxxxx",
    "dealAmount": 0,
    "coinTypePair": "ETH",
    "type": "BUY",
    "isActive": true,
    "orderOid": "xxxxxxxx",
    "createdAt": 1545190958000,
    "dealOrders": {
      "total": 0,
      "firstPage": true,
      "lastPage": false,
      "datas": [],
      "currPageNo": 1,
      "limit": 20,
      "pageNos": 1
    },
    "dealPriceAverage": 0,
    "orderPrice": 0.000001,
    "pendingAmount": 1
  }
}
```
</details>

### Websocket

#### subTrade
```typescript
client.wsWrapper.subTrade('ETH-BTC', (order) => {
  console.log(order)
})
```

<details>
<summary>Output</summary>

```typescript
{
  "volume": 0.10254734,
  "price": 0.02731682,
  "count": 3.754,
  "action": "CANCEL",
  "time": 1545201361576,
  "type": "BUY"
}
```
</details>

#### subHistory
```typescript
client.wsWrapper.subHistory('ETH-BTC', (history) => {
  console.log(history)
})
```
<details>
<summary>Output</summary>

```typescript
{
  "price": 0.02738049,
  "count": 0.0022517,
  "oid": "5c19e6db9dda1509ac736e8f",
  "time": 1545201371000,
  "volValue": 0.00006165,
  "direction": "SELL"
}
```
</details>

#### subTick
```typescript
client.wsWrapper.subTick('ETH-BTC', (tick) => {
  console.log(tick)
})
```

<details>
<summary>Output</summary>

```typescript
{
  "coinType": "ETH",
  "trading": true,
  "symbol": "ETH-BTC",
  "lastDealPrice": 0.02738,
  "buy": 0.02738099,
  "sell": 0.02738505,
  "change": 0.00081441,
  "coinTypePair": "BTC",
  "sort": 100,
  "feeRate": 0.001,
  "volValue": 232.14004202,
  "high": 0.02827042,
  "datetime": 1545201372000,
  "vol": 8580.0709704,
  "low": 0.02642035,
  "changeRate": 0.0307
}
```
</details>

#### subMarket
```typescript
client.wsWrapper.subMarket('ETH', (tick) => {
  console.log(tick)
})
```

<details>
<summary>Output</summary>

```typescript
{
  "coinType": "SNC",
  "trading": true,
  "symbol": "SNC-ETH",
  "lastDealPrice": 0.000136,
  "buy": 0.0001353,
  "sell": 0.00014,
  "change": 0.0000013,
  "coinTypePair": "ETH",
  "sort": 0,
  "feeRate": 0.001,
  "volValue": 1.79739589,
  "high": 0.000137,
  "datetime": 1545201372000,
  "vol": 13269.8734,
  "low": 0.0001347,
  "changeRate": 0.0097
}
```
</details>

#### unsubTrade
```typescript
client.wsWrapper.unsubTrade('ETH-BTC')
```

#### unsubHistory
```typescript
client.wsWrapper.unsubHistory('ETH-BTC')
```

#### unsubTick
```typescript
client.wsWrapper.unsubTick('ETH-BTC')
```

#### unsubMarket
```typescript
client.wsWrapper.unsubMarket('ETH')
```

#### close
```typescript
client.wsWrapper.close()
```


## 参考
* [binance-api-node](https://github.com/HyperCubeProject/binance-api-node)
* [kucoin-api](https://github.com/Satoshinaire/kucoin-api)

## License
MIT