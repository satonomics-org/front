import { createLazyMemo } from '@solid-primitives/memo'
import { getOwner } from 'solid-js'

import {
  colors,
  computeYearlyMovingAverage,
  convertCandlesticksToSingleValueDataset,
} from '/src/scripts'

import { addAverages, addQuantiles } from './addOns'
import { addRatios } from './addOns/ratios'
import {
  createEntities30DBalanceChangeDataset,
  createEntities90DBalanceChangeDataset,
  createLazyDataset,
  createResourceDataset,
} from './creators'

export const USABLE_CANDLESTICKS_START_DATE = '2012-01-01'

export const createDatasets = (resources: Resources) => {
  const closes = addAverages(
    createLazyDataset({
      fetch: resources.candlesticks.fetch,
      values: createLazyMemo(() =>
        convertCandlesticksToSingleValueDataset(
          resources.candlesticks.values(),
        ),
      ),
    }),
  )

  const datasets: Datasets = {
    candlesticks: createResourceDataset(resources.candlesticks),
    closes,
    closesRecord: {
      fetch() {
        resources.candlesticks.fetch(getOwner())
      },
      values: createLazyMemo(() =>
        (closes.values() || []).reduce(
          (obj, { date, value }) => {
            obj[date] = value
            return obj
          },
          {} as Record<string, number>,
        ),
      ),
    },
    weeklyMA: addQuantiles(
      addRatios(
        createLazyDataset({
          fetch: resources.candlesticks.fetch,
          values: closes.averages.weekly,
        }),
        closes.values,
      ),
    ),
    monthlyMA: addQuantiles(
      addRatios(
        createLazyDataset({
          fetch: resources.candlesticks.fetch,
          values: closes.averages.monthly,
        }),
        closes.values,
      ),
    ),
    yearlyMA: addQuantiles(
      addRatios(
        createLazyDataset({
          fetch: resources.candlesticks.fetch,
          values: closes.averages.yearly,
        }),
        closes.values,
      ),
    ),
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
    netRealizedProfitAndLoss: createResourceDataset(
      resources.netRealizedProfitAndLoss,
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
    fundingRates: createLazyDataset({
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
    vddMultiple: createLazyDataset({
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
    hashrate: addAverages(createResourceDataset(resources.hashrate)),
    minersRevenueInDollars: addAverages(
      createLazyDataset({
        fetch: resources.minersRevenue.fetch,
        values: createLazyMemo(() =>
          (resources.minersRevenue.values() || []).map(
            ({ date, time, value }) => ({
              date,
              time,
              value: value * datasets.closesRecord.values()[date],
            }),
          ),
        ),
      }),
    ),
    puellMultiple: addAverages(
      createLazyDataset({
        fetch: resources.minersRevenue.fetch,
        values: createLazyMemo(() => {
          const dailyDataset = datasets.minersRevenueInDollars.values() || []

          const yearlyDataset = computeYearlyMovingAverage(dailyDataset)

          return dailyDataset.map(({ date, time, value }, index) => {
            const yearlyValue = yearlyDataset[index].value

            return {
              date,
              time,
              value: value / yearlyValue,
            }
          })
        }),
      }),
    ),
    stablecoinsMarketCaps: createResourceDataset(
      resources.stablecoinsMarketCaps,
    ),
    '30DBalanceChanges': createEntities30DBalanceChangeDataset(resources),
    '90DBalanceChanges': createEntities90DBalanceChangeDataset(resources),
  }

  return datasets
}
