import { createLazyMemo } from '@solid-primitives/memo'
import { getOwner } from 'solid-js'

import {
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
  convertCandlesticksToSingleValueDataset,
} from '/src/scripts'

import { addAverages, addQuantiles } from './addOns'
import { addRatios } from './addOns/ratios'

export const USABLE_CANDLESTICKS_START_DATE = '2012-01-01'

export const createDatasets = (resources: Resources) => {
  const closes = createLazyMemo(
    () =>
      convertCandlesticksToSingleValueDataset(resources.candlesticks.values()),
    // {
    //   equals: (prev: SingleValueData[], next: SingleValueData[]) =>
    //     prev.length === next.length,
    // },
  )

  const closesRecord = createLazyMemo(() =>
    closes().reduce(
      (obj, data) => {
        obj[data.time as string] = data.value
        return obj
      },
      {} as Record<string, number>,
    ),
  )

  const datasets: Datasets = {
    candlesticks: createDataset(resources.candlesticks),
    weeklyMA: addQuantiles(
      addRatios(
        createLazyMemoDataset({
          fetch: resources.candlesticks.fetch,
          values: createLazyMemo(() => computeWeeklyMovingAverage(closes())),
        }),
        closes,
      ),
    ),
    monthlyMA: addQuantiles(
      addRatios(
        createLazyMemoDataset({
          fetch: resources.candlesticks.fetch,
          values: createLazyMemo(() => computeMonthlyMovingAverage(closes())),
        }),
        closes,
      ),
    ),
    yearlyMA: addQuantiles(
      addRatios(
        createLazyMemoDataset({
          fetch: resources.candlesticks.fetch,
          values: createLazyMemo(() => computeYearlyMovingAverage(closes())),
        }),
        closes,
      ),
    ),
    sthRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.sthRealizedPrice), closes),
    ),
    lthRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.lthRealizedPrice), closes),
    ),
    oneMonthRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.oneMonthRealizedPrice), closes),
    ),
    threeMonthsRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.threeMonthsRealizedPrice), closes),
    ),
    sixMonthsRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.sixMonthsRealizedPrice), closes),
    ),
    oneYearRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.oneYearRealizedPrice), closes),
    ),
    twoYearsRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.twoYearsRealizedPrice), closes),
    ),
    netRealizedProfitAndLoss: createDataset(resources.netRealizedProfitAndLoss),
    sopr: createDataset(resources.sopr),
    planktonRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.planktonRealizedPrice), closes),
    ),
    shrimpsRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.shrimpsRealizedPrice), closes),
    ),
    crabsRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.crabsRealizedPrice), closes),
    ),
    fishRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.fishRealizedPrice), closes),
    ),
    sharksRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.sharksRealizedPrice), closes),
    ),
    whalesRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.whalesRealizedPrice), closes),
    ),
    humpbacksRealizedPrice: addQuantiles(
      addRatios(createDataset(resources.humpbacksRealizedPrice), closes),
    ),
    planktonBalances: createDataset(resources.planktonBalances),
    shrimpsBalances: createDataset(resources.shrimpsBalances),
    crabsBalances: createDataset(resources.crabsBalances),
    fishBalances: createDataset(resources.fishBalances),
    sharksBalances: createDataset(resources.sharksBalances),
    whalesBalances: createDataset(resources.whalesBalances),
    humpbacksBalances: createDataset(resources.humpbacksBalances),
    planktonDistribution: createDataset(resources.planktonDistribution),
    shrimpsDistribution: createDataset(resources.shrimpsDistribution),
    crabsDistribution: createDataset(resources.crabsDistribution),
    fishDistribution: createDataset(resources.fishDistribution),
    sharksDistribution: createDataset(resources.sharksDistribution),
    whalesDistribution: createDataset(resources.whalesDistribution),
    humpbacksDistribution: createDataset(resources.humpbacksDistribution),
    terminalPrice: addQuantiles(
      addRatios(createDataset(resources.terminalPrice), closes),
    ),
    realizedPrice: addQuantiles(
      addRatios(createDataset(resources.realizedPrice), closes),
    ),
    balancedPrice: addQuantiles(
      addRatios(createDataset(resources.balancedPrice), closes),
    ),
    cointimePrice: addQuantiles(
      addRatios(createDataset(resources.cointimePrice), closes),
    ),
    trueMeanPrice: addQuantiles(
      addRatios(createDataset(resources.trueMeanPrice), closes),
    ),
    vaultedPrice: addQuantiles(
      addRatios(createDataset(resources.vaultedPrice), closes),
    ),
    cvdd: addQuantiles(addRatios(createDataset(resources.cvdd), closes)),
    fundingRates: createDataset(resources.fundingRates),
    vddMultiple: createDataset(resources.vddMultiple),
    minersRevenueInBitcoin: addAverages(createDataset(resources.minersRevenue)),
    supplyInProfit: createDataset(resources.supplyInProfit),
    supplyInLoss: createDataset(resources.supplyInLoss),
    lthSupply: createDataset(resources.lthSupply),
    sthSupply: createDataset(resources.sthSupply),
    lthInProfit: createDataset(resources.lthInProfit),
    sthInProfit: createDataset(resources.sthInProfit),
    lthInLoss: createDataset(resources.lthInLoss),
    sthInLoss: createDataset(resources.sthInLoss),
    hashrate: addAverages(createDataset(resources.hashrate)),
    minersRevenueInDollars: addAverages(
      createLazyMemoDataset({
        fetch: resources.minersRevenue.fetch,
        values: createLazyMemo(() =>
          (resources.minersRevenue.values() || []).map((data) => ({
            time: data.time,
            value: data.value * closesRecord()[data.time as string],
          })),
        ),
      }),
    ),
    puellMultiple: addAverages(
      createLazyMemoDataset({
        fetch: resources.minersRevenue.fetch,
        values: createLazyMemo(() => {
          const dailyDataset = (resources.minersRevenue.values() || []).map(
            (data) => ({
              time: data.time,
              value: data.value * closesRecord()[data.time as string],
            }),
          )

          const yearlyDataset = computeYearlyMovingAverage(dailyDataset)

          return dailyDataset.map(({ time, value }, index) => {
            const yearlyValue = yearlyDataset[index].value

            return {
              time,
              value: value / yearlyValue,
            }
          })
        }),
      }),
    ),
    stablecoinsMarketCaps: createDataset(resources.stablecoinsMarketCaps),
  }

  return datasets
}

const createDataset = <Value>({
  values,
  fetch,
}: ResourceHTTP<Value>): Dataset<Value> => ({
  values,
  fetch() {
    fetch(getOwner())
  },
})

const createLazyMemoDataset = <Value>({
  fetch,
  values,
}: {
  fetch: ResourceHTTP<Value>['fetch']
  values: Accessor<Value[]>
}): Dataset<Value> => ({
  values,
  fetch() {
    fetch(getOwner())
  },
})
