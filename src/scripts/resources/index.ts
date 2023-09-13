import { getOwner } from 'solid-js'

import { backEndAPI, krakenAPI } from '/src/scripts'

import { createResourceHTTP, createResourceWS } from './creators'

export const createResources = () => {
  const resources: Resources = {
    candlesticks: createResourceHTTP(backEndAPI.fetchCandlesticks),
    latestCandle: createResourceWS(krakenAPI.createLiveCandleWebsocket),
    sthRealizedPrice: createResourceHTTP(backEndAPI.fetchSTHRealizedPrice),
    lthRealizedPrice: createResourceHTTP(backEndAPI.fetchLTHRealizedPrice),
    oneMonthRealizedPrice: createResourceHTTP(backEndAPI.fetch1MRealizedPrice),
    threeMonthsRealizedPrice: createResourceHTTP(
      backEndAPI.fetch3MRealizedPrice,
    ),
    sixMonthsRealizedPrice: createResourceHTTP(backEndAPI.fetch6MRealizedPrice),
    oneYearRealizedPrice: createResourceHTTP(backEndAPI.fetch1YRealizedPrice),
    twoYearsRealizedPrice: createResourceHTTP(backEndAPI.fetch2YRealizedPrice),
    netRealizedProfitAndLoss: createResourceHTTP(
      backEndAPI.fetchNetRealizedProfitAndLoss,
    ),
    sopr: createResourceHTTP(backEndAPI.fetchSOPR),
    planktonRealizedPrice: createResourceHTTP(
      backEndAPI.fetchPlanktonRealizedPrice,
    ),
    shrimpsRealizedPrice: createResourceHTTP(
      backEndAPI.fetchShrimpsRealizedPrice,
    ),
    crabsRealizedPrice: createResourceHTTP(backEndAPI.fetchCrabsRealizedPrice),
    fishRealizedPrice: createResourceHTTP(backEndAPI.fetchFishRealizedPrice),
    sharksRealizedPrice: createResourceHTTP(
      backEndAPI.fetchSharksRealizedPrice,
    ),
    whalesRealizedPrice: createResourceHTTP(
      backEndAPI.fetchWhalesRealizedPrice,
    ),
    humpbacksRealizedPrice: createResourceHTTP(
      backEndAPI.fetchHumpbacksRealizedPrice,
    ),
    planktonBalances: createResourceHTTP(backEndAPI.fetchPlanktonBalances),
    shrimpsBalances: createResourceHTTP(backEndAPI.fetchShrimpsBalances),
    crabsBalances: createResourceHTTP(backEndAPI.fetchCrabsBalances),
    fishBalances: createResourceHTTP(backEndAPI.fetchFishBalances),
    sharksBalances: createResourceHTTP(backEndAPI.fetchSharksBalances),
    whalesBalances: createResourceHTTP(backEndAPI.fetchWhalesBalances),
    humpbacksBalances: createResourceHTTP(backEndAPI.fetchHumpbacksBalances),
    planktonDistribution: createResourceHTTP(
      backEndAPI.fetchPlanktonDistribution,
    ),
    shrimpsDistribution: createResourceHTTP(
      backEndAPI.fetchShrimpsDistribution,
    ),
    crabsDistribution: createResourceHTTP(backEndAPI.fetchCrabsDistribution),
    fishDistribution: createResourceHTTP(backEndAPI.fetchFishDistribution),
    sharksDistribution: createResourceHTTP(backEndAPI.fetchSharksDistribution),
    whalesDistribution: createResourceHTTP(backEndAPI.fetchWhalesDistribution),
    humpbacksDistribution: createResourceHTTP(
      backEndAPI.fetchHumpbacksDistribution,
    ),
    terminalPrice: createResourceHTTP(backEndAPI.fetchTerminalPrice),
    realizedPrice: createResourceHTTP(backEndAPI.fetchRealizedPrice),
    balancedPrice: createResourceHTTP(backEndAPI.fetchBalancedPrice),
    cointimePrice: createResourceHTTP(backEndAPI.fetchCointimePrice),
    trueMeanPrice: createResourceHTTP(backEndAPI.fetchTrueMeanPrice),
    vaultedPrice: createResourceHTTP(backEndAPI.fetchVaultedPrice),
    cvdd: createResourceHTTP(backEndAPI.fetchCVDD),
    fundingRates: createResourceHTTP(backEndAPI.fetchFundingRates),
    vddMultiple: createResourceHTTP(backEndAPI.fetchVDDMultiple),
    minersRevenue: createResourceHTTP(backEndAPI.fetchMinersRevenue),
    supplyInProfit: createResourceHTTP(backEndAPI.fetchSupplyInProfit),
    supplyInLoss: createResourceHTTP(backEndAPI.fetchSupplyInLoss),
    lthSupply: createResourceHTTP(backEndAPI.fetchLTHSupply),
    sthSupply: createResourceHTTP(backEndAPI.fetchSTHSupply),
    lthInProfit: createResourceHTTP(backEndAPI.fetchLTHInProfit),
    sthInProfit: createResourceHTTP(backEndAPI.fetchSTHInProfit),
    lthInLoss: createResourceHTTP(backEndAPI.fetchLTHInLoss),
    sthInLoss: createResourceHTTP(backEndAPI.fetchSTHInLoss),
    hashrate: createResourceHTTP(backEndAPI.fetchHashrate),
    stablecoinsMarketCaps: createResourceHTTP(
      backEndAPI.fetchStablecoinsMarketCaps,
    ),
  }

  resources.candlesticks.fetch(getOwner())
  resources.latestCandle.open()

  return resources
}
