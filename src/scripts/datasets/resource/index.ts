import { createLazyMemo } from '@solid-primitives/memo'

import cachedCandlesticks from '/src/assets/data/btcusd.json'
import {
  colors,
  convertCandlesticksToSingleValueDataset,
  darken,
} from '/src/scripts'

import { addAverages, addQuantiles, addRatios } from '../addOns'
import { createLazyDataset } from '../lazy'
import {
  createEntities30DBalanceChangeDataset,
  createEntities90DBalanceChangeDataset,
  createResourceDataset,
} from './creators'

export const createResourceDatasets = (resources: ResourcesHTTP) => {
  resources.candlesticks.url.searchParams.set(
    'since',
    (
      new Date(cachedCandlesticks.at(-1)?.date || 0).valueOf() / 1000
    ).toString(),
  )

  resources.candlesticks.fetch()

  const candlesticks = createResourceDataset({
    fetch: resources.candlesticks.fetch,
    values: createLazyMemo(() =>
      [
        ...(cachedCandlesticks as FetchedCandlestick[]),
        ...(resources.candlesticks.values() || []),
      ].map((candle) => ({
        ...candle,
        time: candle.date,
      })),
    ),
  })

  const closes = addAverages(
    createLazyDataset(() =>
      convertCandlesticksToSingleValueDataset(candlesticks.values()),
    ),
  )

  return {
    candlesticks,
    closes,
    closesRecord: createLazyDataset(
      createLazyMemo(() =>
        (closes.values() || []).reduce(
          (obj, { date, value }) => {
            obj[date] = value
            return obj
          },
          {} as Record<string, number>,
        ),
      ),
    ),
    goldPrice: createResourceDataset(resources.goldPrice),
    sthRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.sthRealizedPrice),
        closes.values,
      ),
    ),
    lthRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.lthRealizedPrice),
        closes.values,
      ),
    ),
    oneMonthRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.oneMonthRealizedPrice),
        closes.values,
      ),
    ),
    threeMonthsRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.threeMonthsRealizedPrice),
        closes.values,
      ),
    ),
    sixMonthsRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.sixMonthsRealizedPrice),
        closes.values,
      ),
    ),
    oneYearRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.oneYearRealizedPrice),
        closes.values,
      ),
    ),
    twoYearsRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.twoYearsRealizedPrice),
        closes.values,
      ),
    ),
    netRealizedProfitAndLoss: addAverages(
      createResourceDataset({
        fetch: resources.netRealizedProfitAndLoss.fetch,
        values: createLazyMemo(() =>
          (resources.netRealizedProfitAndLoss.values() || []).map((data) => ({
            ...data,
            color: darken(data.value < 0 ? colors.down : colors.up, 0.25),
          })),
        ),
      }),
    ),
    sopr: createResourceDataset(resources.sopr),
    planktonRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.planktonRealizedPrice),
        closes.values,
      ),
    ),
    shrimpsRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.shrimpsRealizedPrice),
        closes.values,
      ),
    ),
    crabsRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.crabsRealizedPrice),
        closes.values,
      ),
    ),
    fishRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.fishRealizedPrice),
        closes.values,
      ),
    ),
    sharksRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.sharksRealizedPrice),
        closes.values,
      ),
    ),
    whalesRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.whalesRealizedPrice),
        closes.values,
      ),
    ),
    humpbacksRealizedPrice: addQuantiles(
      addRatios(
        createResourceDataset(resources.humpbacksRealizedPrice),
        closes.values,
      ),
    ),
    planktonBalances: createResourceDataset(resources.planktonBalances),
    shrimpsBalances: createResourceDataset(resources.shrimpsBalances),
    crabsBalances: createResourceDataset(resources.crabsBalances),
    fishBalances: createResourceDataset(resources.fishBalances),
    sharksBalances: createResourceDataset(resources.sharksBalances),
    whalesBalances: createResourceDataset(resources.whalesBalances),
    humpbacksBalances: createResourceDataset(resources.humpbacksBalances),
    planktonDistribution: createResourceDataset(resources.planktonDistribution),
    shrimpsDistribution: createResourceDataset(resources.shrimpsDistribution),
    crabsDistribution: createResourceDataset(resources.crabsDistribution),
    fishDistribution: createResourceDataset(resources.fishDistribution),
    sharksDistribution: createResourceDataset(resources.sharksDistribution),
    whalesDistribution: createResourceDataset(resources.whalesDistribution),
    humpbacksDistribution: createResourceDataset(
      resources.humpbacksDistribution,
    ),
    terminalPrice: addQuantiles(
      addRatios(createResourceDataset(resources.terminalPrice), closes.values),
    ),
    realizedPrice: addQuantiles(
      addRatios(createResourceDataset(resources.realizedPrice), closes.values),
    ),
    balancedPrice: addQuantiles(
      addRatios(createResourceDataset(resources.balancedPrice), closes.values),
    ),
    cointimePrice: addQuantiles(
      addRatios(createResourceDataset(resources.cointimePrice), closes.values),
    ),
    trueMeanPrice: addQuantiles(
      addRatios(createResourceDataset(resources.trueMeanPrice), closes.values),
    ),
    vaultedPrice: addQuantiles(
      addRatios(createResourceDataset(resources.vaultedPrice), closes.values),
    ),
    cvdd: addQuantiles(
      addRatios(createResourceDataset(resources.cvdd), closes.values),
    ),
    fundingRates: createResourceDataset({
      fetch: resources.fundingRates.fetch,
      values: createLazyMemo(() =>
        (resources.fundingRates.values() || []).map(
          ({ date, time, value }) => ({
            date,
            time,
            value: value * 100,
            color: value >= 0 ? colors.up : colors.down,
          }),
        ),
      ),
    }),
    vddMultiple: createResourceDataset({
      fetch: resources.vddMultiple.fetch,
      values: createLazyMemo(() =>
        (resources.vddMultiple.values() || []).map(({ date, time, value }) => {
          const color =
            value >= 3
              ? colors.red[500]
              : value >= 1
              ? colors.orange[500]
              : colors.green[500]

          return {
            date,
            time,
            value: value * 100,
            color: color,
          }
        }),
      ),
    }),
    minersRevenueInBitcoin: addAverages(
      createResourceDataset(resources.minersRevenue),
    ),
    supplyInProfit: createResourceDataset(resources.supplyInProfit),
    supplyInLoss: createResourceDataset(resources.supplyInLoss),
    lthSupply: createResourceDataset(resources.lthSupply),
    sthSupply: createResourceDataset(resources.sthSupply),
    lthInProfit: createResourceDataset(resources.lthInProfit),
    sthInProfit: createResourceDataset(resources.sthInProfit),
    lthInLoss: createResourceDataset(resources.lthInLoss),
    sthInLoss: createResourceDataset(resources.sthInLoss),
    hashRate: addAverages(createResourceDataset(resources.hashRate)),
    '30DBalanceChanges': createEntities30DBalanceChangeDataset(resources),
    '90DBalanceChanges': createEntities90DBalanceChangeDataset(resources),
    totalMarketCap: createResourceDataset(resources.totalMarketCap),
    altcoinsMarketCap: createResourceDataset(resources.altcoinsMarketCap),
    bitcoinMarketCap: createResourceDataset(resources.bitcoinMarketCap),
    ethereumMarketCap: createResourceDataset(resources.ethereumMarketCap),
    usdtMarketCap: createResourceDataset(resources.usdtMarketCap),
    usdcMarketCap: createResourceDataset(resources.usdcMarketCap),
    tusdMarketCap: createResourceDataset(resources.tusdMarketCap),
    busdMarketCap: createResourceDataset(resources.busdMarketCap),
    daiMarketCap: createResourceDataset(resources.daiMarketCap),
    fraxMarketCap: createResourceDataset(resources.fraxMarketCap),
    usddMarketCap: createResourceDataset(resources.usddMarketCap),
    ustMarketCap: createResourceDataset(resources.ustMarketCap),
    pyusdMarketCap: createResourceDataset(resources.pyusdMarketCap),
  }
}
