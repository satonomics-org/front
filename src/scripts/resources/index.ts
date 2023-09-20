import cachedCandlesticks from '/src/assets/data/btcusd.json'
import { backEndFetch, computeBackEndURL, krakenAPI } from '/src/scripts'

import {
  createBackEndResource,
  createResourceHTTP,
  createResourceWS,
} from './creators'

export const createResources = () => {
  const resources: Resources = {
    http: createResourcesHTTP(),
    ws: createResourcesWS(),
  }

  resources.http.candlesticks.fetch()
  resources.ws.latestCandle.open()

  return resources
}

export const createResourcesHTTP = () => {
  const candlesticks = createResourceHTTP<
    CandlestickDataWithVolumeWithoutTime[],
    CandlestickDataWithVolume[]
  >({
    url: computeBackEndURL(
      `/candlesticks?since=${
        new Date(cachedCandlesticks.at(-1)?.date || 0).valueOf() / 1000
      }`,
    ),
    customFetch: backEndFetch,
    cached: cachedCandlesticks,
    map: (candlestick) => ({
      ...candlestick,
      time: candlestick.date,
    }),
  })

  const resources: ResourcesHTTP = {
    candlesticks,
    sthRealizedPrice: createBackEndResource(`/sth-realized-price`),
    lthRealizedPrice: createBackEndResource(`/lth-realized-price`),
    oneMonthRealizedPrice: createBackEndResource(`/1m-realized-price`),
    threeMonthsRealizedPrice: createBackEndResource(`/3m-realized-price`),
    sixMonthsRealizedPrice: createBackEndResource(`/6m-realized-price`),
    oneYearRealizedPrice: createBackEndResource(`/1y-realized-price`),
    twoYearsRealizedPrice: createBackEndResource(`/2y-realized-price`),
    netRealizedProfitAndLoss: createBackEndResource(`/net-realized-pnl`),
    sopr: createBackEndResource(`/sopr`),
    planktonRealizedPrice: createBackEndResource(`/plankton-realized-price`),
    shrimpsRealizedPrice: createBackEndResource(`/shrimps-realized-price`),
    crabsRealizedPrice: createBackEndResource(`/crabs-realized-price`),
    fishRealizedPrice: createBackEndResource(`/fish-realized-price`),
    sharksRealizedPrice: createBackEndResource(`/sharks-realized-price`),
    whalesRealizedPrice: createBackEndResource(`/whales-realized-price`),
    humpbacksRealizedPrice: createBackEndResource(`/humpbacks-realized-price`),
    planktonBalances: createBackEndResource(`/plankton-balances`),
    shrimpsBalances: createBackEndResource(`/shrimps-balances`),
    crabsBalances: createBackEndResource(`/crabs-balances`),
    fishBalances: createBackEndResource(`/fish-balances`),
    sharksBalances: createBackEndResource(`/sharks-balances`),
    whalesBalances: createBackEndResource(`/whales-balances`),
    humpbacksBalances: createBackEndResource(`/humpbacks-balances`),
    planktonDistribution: createBackEndResource(`/plankton-distribution`),
    shrimpsDistribution: createBackEndResource(`/shrimps-distribution`),
    crabsDistribution: createBackEndResource(`/crabs-distribution`),
    fishDistribution: createBackEndResource(`/fish-distribution`),
    sharksDistribution: createBackEndResource(`/sharks-distribution`),
    whalesDistribution: createBackEndResource(`/whales-distribution`),
    humpbacksDistribution: createBackEndResource(`/humpbacks-distribution`),
    terminalPrice: createBackEndResource(`/terminal-price`),
    realizedPrice: createBackEndResource(`/realized-price`),
    balancedPrice: createBackEndResource(`/balanced-price`),
    cointimePrice: createBackEndResource(`/cointime-price`),
    trueMeanPrice: createBackEndResource(`/true-mean-price`),
    vaultedPrice: createBackEndResource(`/vaulted-price`),
    cvdd: createBackEndResource(`/cvdd`),
    fundingRates: createBackEndResource(`/funding-rates`),
    vddMultiple: createBackEndResource(`/vdd-multiple`),
    minersRevenue: createBackEndResource(`/miners-revenue`),
    supplyInProfit: createBackEndResource(`/supply-in-profit`),
    supplyInLoss: createBackEndResource(`/supply-in-loss`),
    lthSupply: createBackEndResource(`/lth-supply`),
    sthSupply: createBackEndResource(`/sth-supply`),
    lthInProfit: createBackEndResource(`/lth-in-profit`),
    sthInProfit: createBackEndResource(`/sth-in-profit`),
    lthInLoss: createBackEndResource(`/lth-in-loss`),
    sthInLoss: createBackEndResource(`/sth-in-loss`),
    hashrate: createBackEndResource(`/hashrate`),
  }

  candlesticks.fetch()

  return resources
}

export const createResourcesWS = () => {
  const resources: ResourcesWS = {
    latestCandle: createResourceWS(krakenAPI.createLiveCandleWebsocket),
  }

  resources.latestCandle.open()

  return resources
}
