import { createLazyMemo } from '@solid-primitives/memo'

import {
  colors,
  computeYearlyMovingAverage,
  convertCandlesticksToSingleValueDataset,
  convertCandleToColor,
  darken,
} from '/src/scripts'

import { addAverages, addQuantiles } from './addOns'
import { addRatios } from './addOns/ratios'
import {
  createEntities30DBalanceChangeDataset,
  createEntities90DBalanceChangeDataset,
  createExtremeQuantilesDataset,
  createLazyDataset,
  createResourceDataset,
} from './creators'

export const USABLE_CANDLESTICKS_START_DATE = '2012-01-01'

export const createDatasets = (resources: Resources) => {
  const closes = addAverages(
    createLazyDataset(() =>
      convertCandlesticksToSingleValueDataset(datasets.candlesticks.values()),
    ),
  )

  const datasets: Datasets = {
    candlesticks: createResourceDataset(resources.candlesticks),
    closes,
    closesRecord: {
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
    volumeInBitcoin: addAverages(
      createLazyDataset(() =>
        (datasets.candlesticks.values() || []).map((candle) => ({
          date: candle.date,
          time: candle.time,
          value: candle.volume,
          color: darken(convertCandleToColor(candle), 0.33),
        })),
      ),
    ),
    volumeInDollars: addAverages(
      createLazyDataset(() =>
        (datasets.candlesticks.values() || []).map((candle) => ({
          date: candle.date,
          time: candle.time,
          value: candle.close * candle.volume,
          color: darken(convertCandleToColor(candle), 0.33),
        })),
      ),
    ),
    weeklyMA: addQuantiles(
      addRatios(createLazyDataset(closes.averages.weekly), closes.values),
    ),
    monthlyMA: addQuantiles(
      addRatios(createLazyDataset(closes.averages.monthly), closes.values),
    ),
    yearlyMA: addQuantiles(
      addRatios(createLazyDataset(closes.averages.yearly), closes.values),
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
    hashrate: addAverages(createResourceDataset(resources.hashrate)),
    minersRevenueInDollars: addAverages(
      createResourceDataset({
        fetch: resources.minersRevenue.fetch,
        values: createLazyMemo(() =>
          (resources.minersRevenue.values() || []).map(
            ({ date, time, value }) => ({
              date,
              time,
              value: value * (datasets.closesRecord.values()?.[date] || 1),
            }),
          ),
        ),
      }),
    ),
    puellMultiple: addAverages(
      createLazyDataset(() => {
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
    ),
    stablecoinsMarketCaps: createResourceDataset(
      resources.stablecoinsMarketCaps,
    ),
    combinedStablecoinsMarketCaps: createLazyDataset(() =>
      Object.entries(
        (datasets.stablecoinsMarketCaps.values() || [])?.reduce(
          (combined, stablecoin) => {
            stablecoin.dataset.forEach(
              ({ date, value }) =>
                (combined[date] = (combined[date] || 0) + value),
            )
            return combined
          },
          {} as Record<string, number>,
        ),
      )
        .map(([date, value]) => ({
          date,
          time: date,
          value,
        }))
        .sort(
          ({ date: a }, { date: b }) =>
            new Date(a).valueOf() - new Date(b).valueOf(),
        ),
    ),
    '30DBalanceChanges': createEntities30DBalanceChangeDataset(resources),
    '90DBalanceChanges': createEntities90DBalanceChangeDataset(resources),
    localExtremes: createExtremeQuantilesDataset(() => [
      datasets.oneMonthRealizedPrice.quantiles,
      datasets.threeMonthsRealizedPrice.quantiles,
      datasets.sthRealizedPrice.quantiles,
      datasets.sixMonthsRealizedPrice.quantiles,
      datasets.monthlyMA.quantiles,
      datasets.weeklyMA.quantiles,
    ]),
    cycleExtremes: createExtremeQuantilesDataset(() => [
      datasets.oneYearRealizedPrice.quantiles,
      datasets.realizedPrice.quantiles,
      datasets.twoYearsRealizedPrice.quantiles,
      datasets.lthRealizedPrice.quantiles,
      datasets.planktonRealizedPrice.quantiles,
      datasets.shrimpsRealizedPrice.quantiles,
      datasets.crabsRealizedPrice.quantiles,
      datasets.fishRealizedPrice.quantiles,
      datasets.sharksRealizedPrice.quantiles,
      datasets.whalesRealizedPrice.quantiles,
      datasets.humpbacksRealizedPrice.quantiles,
      datasets.balancedPrice.quantiles,
      datasets.trueMeanPrice.quantiles,
      datasets.cointimePrice.quantiles,
      datasets.vaultedPrice.quantiles,
      datasets.cvdd.quantiles,
      datasets.yearlyMA.quantiles,
      datasets.terminalPrice.quantiles,
    ]),
    mergedExtremes: createExtremeQuantilesDataset(() => [
      datasets.localExtremes,
      datasets.cycleExtremes,
    ]),
  }

  return datasets
}
