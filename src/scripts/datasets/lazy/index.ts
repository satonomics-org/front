import { createLazyMemo } from '@solid-primitives/memo'

import {
  computeYearlyMovingAverage,
  convertCandlesticksToSingleValueDataset,
  convertCandleToColor,
  darken,
  FIVE_MONTHS_IN_DAYS,
  ONE_DAY_IN_MS,
} from '/src/scripts'

import { addAverages, addQuantiles, addRatios } from '../addOns'
import {
  convertNormalCandleToGoldPerBitcoinCandle,
  convertNormalCandleToSatCandle,
} from './converters'
import { createExtremeQuantilesDataset, createLazyDataset } from './creators'

export * from './creators'
export * from './converters'

export const USABLE_CANDLESTICKS_START_DATE = '2012-01-01'

export const createLazyDatasets = (resourceDatasets: ResourceDatasets) => {
  const { candlesticks, closes, closesRecord } = resourceDatasets

  const satsPrice = createLazyDataset(
    createLazyMemo(() =>
      (candlesticks.values() || [])
        .map(convertNormalCandleToSatCandle)
        .filter(
          ({ open, high, low, close }) =>
            open !== Infinity &&
            high !== Infinity &&
            low !== Infinity &&
            close !== Infinity,
        ),
    ),
  )

  const goldPerBitcoin = createLazyDataset(
    createLazyMemo(() => {
      const bitcoinPrice = candlesticks.values() || []
      const goldPrice = resourceDatasets.goldPrice.values() || []

      if (!bitcoinPrice.length || !goldPrice.length) return []

      const index = bitcoinPrice.findIndex(
        ({ date }) => date === goldPrice.at(0)?.date,
      )

      if (index === -1) return []

      let goldIndex = 0
      return bitcoinPrice.slice(index).map((candlestick) => {
        goldIndex = Math.min(goldIndex + 1, goldPrice.length - 1)

        while (
          new Date(goldPrice.at(goldIndex)?.date || 0) >
          new Date(candlestick.date)
        ) {
          goldIndex -= 1
        }

        const goldValue = goldPrice.at(goldIndex)?.value || 1

        return convertNormalCandleToGoldPerBitcoinCandle(candlestick, goldValue)
      })
    }),
  )

  const minersRevenueInDollars = addAverages(
    createLazyDataset(() =>
      (resourceDatasets.minersRevenueInBitcoin.values() || []).map(
        ({ date, time, value }) => ({
          date,
          time,
          value: value * (closesRecord.values()?.[date] || 1),
        }),
      ),
    ),
  )

  const weeklyMA = addQuantiles(
    addRatios(createLazyDataset(closes.averages.weekly), closes.values),
  )

  const monthlyMA = addQuantiles(
    addRatios(createLazyDataset(closes.averages.monthly), closes.values),
  )

  const yearlyMA = addQuantiles(
    addRatios(createLazyDataset(closes.averages.yearly), closes.values),
  )

  const localExtremes = createExtremeQuantilesDataset(() => [
    resourceDatasets.oneMonthRealizedPrice.quantiles,
    resourceDatasets.threeMonthsRealizedPrice.quantiles,
    resourceDatasets.sthRealizedPrice.quantiles,
    resourceDatasets.sixMonthsRealizedPrice.quantiles,
    monthlyMA.quantiles,
    weeklyMA.quantiles,
  ])

  const cycleExtremes = createExtremeQuantilesDataset(() => [
    resourceDatasets.oneYearRealizedPrice.quantiles,
    resourceDatasets.realizedPrice.quantiles,
    resourceDatasets.twoYearsRealizedPrice.quantiles,
    resourceDatasets.lthRealizedPrice.quantiles,
    resourceDatasets.planktonRealizedPrice.quantiles,
    resourceDatasets.shrimpsRealizedPrice.quantiles,
    resourceDatasets.crabsRealizedPrice.quantiles,
    resourceDatasets.fishRealizedPrice.quantiles,
    resourceDatasets.sharksRealizedPrice.quantiles,
    resourceDatasets.whalesRealizedPrice.quantiles,
    resourceDatasets.humpbacksRealizedPrice.quantiles,
    resourceDatasets.balancedPrice.quantiles,
    resourceDatasets.trueMeanPrice.quantiles,
    resourceDatasets.cointimePrice.quantiles,
    resourceDatasets.vaultedPrice.quantiles,
    resourceDatasets.cvdd.quantiles,
    yearlyMA.quantiles,
    resourceDatasets.terminalPrice.quantiles,
  ])

  return {
    sthPriceHigh: createLazyDataset(
      createLazyMemo(() =>
        (candlesticks.values() || []).map(({ date }, index, arr) => ({
          date,
          time: date,
          value: arr
            .slice(Math.max(0, index - FIVE_MONTHS_IN_DAYS), index + 1)
            .reduce((max, { high }) => (high > max ? high : max), -Infinity),
        })),
      ),
    ),
    sthPriceLow: createLazyDataset(
      createLazyMemo(() =>
        (candlesticks.values() || []).map(({ date }, index, arr) => ({
          date,
          time: date,
          value: arr
            .slice(Math.max(0, index - FIVE_MONTHS_IN_DAYS), index + 1)
            .reduce((min, { low }) => (low < min ? low : min), Infinity),
        })),
      ),
    ),
    satsPrice,
    satsPriceCloses: createLazyDataset(() =>
      convertCandlesticksToSingleValueDataset(satsPrice.values()),
    ),
    goldPerBitcoin,
    goldPerBitcoinCloses: createLazyDataset(() =>
      convertCandlesticksToSingleValueDataset(goldPerBitcoin.values()),
    ),
    volumeInBitcoin: addAverages(
      createLazyDataset(() =>
        (candlesticks.values() || []).map((candle) => ({
          date: candle.date,
          time: candle.time,
          value: candle.volume,
          color: darken(convertCandleToColor(candle), 0.33),
        })),
      ),
    ),
    volumeInDollars: addAverages(
      createLazyDataset(() =>
        (candlesticks.values() || []).map((candle) => ({
          date: candle.date,
          time: candle.time,
          value: candle.close * candle.volume,
          color: darken(convertCandleToColor(candle), 0.33),
        })),
      ),
    ),
    sthReturnsMomentum: createLazyDataset(() => {
      const sthInProfit = resourceDatasets.sthInProfit.values()
      const sthInLoss = resourceDatasets.sthInLoss.values()
      const { date: firstDate } = sthInProfit?.at(0) || {}

      if (!sthInProfit?.length || !sthInLoss?.length || !firstDate) return []

      const firstIndex = sthInProfit.findIndex(({ date }) => date === firstDate)

      if (firstIndex === -1) return []

      return sthInProfit
        .slice(firstIndex)
        .map(({ date: profitDate, value: profitValue }, index) => {
          const { date: lossDate, value: lossValue } = sthInLoss[index]

          if (profitDate !== lossDate) {
            throw Error(`Datasets out of sync ${profitDate} vs ${lossDate}`)
          }

          return {
            date: profitDate,
            time: profitDate,
            value: profitValue > lossValue ? 1 : 0,
          }
        })
    }),
    hashPrice: addAverages(
      createLazyDataset(() => {
        const hashRate = resourceDatasets.hashRate.values() || []

        const minersRevenue = minersRevenueInDollars.values() || []
        const firstMinersRevenue = minersRevenue.at(0)

        if (!minersRevenue.length || !hashRate.length || !firstMinersRevenue)
          return []

        let offset = hashRate.findIndex(
          ({ date }) => date === firstMinersRevenue.date,
        )

        return minersRevenue.map(({ date, time, value }, index) => {
          const hashDate = hashRate.at(index + offset)?.date

          // TODO: Fill data on backend's side
          if (date !== hashDate) {
            offset += Math.ceil(
              (new Date(date).getTime() - new Date(hashDate || '').getTime()) /
                ONE_DAY_IN_MS,
            )
          }

          return {
            date,
            time,
            value: value / (hashRate.at(index + offset)?.value || 0),
          }
        })
      }),
    ),
    minersRevenueInDollars,
    puellMultiple: addAverages(
      createLazyDataset(() => {
        const dailyDataset = minersRevenueInDollars.values() || []

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
    stablecoinsMarketCap: createLazyDataset(() => {
      const values = [
        resourceDatasets.usdtMarketCap.values(),
        resourceDatasets.usdcMarketCap.values(),
        resourceDatasets.daiMarketCap.values(),
        resourceDatasets.tusdMarketCap.values(),
        resourceDatasets.busdMarketCap.values(),
        resourceDatasets.usddMarketCap.values(),
        resourceDatasets.fraxMarketCap.values(),
        resourceDatasets.ustMarketCap.values(),
        resourceDatasets.pyusdMarketCap.values(),
      ]

      if (values.some((list) => !list?.length)) return []

      return Object.entries(
        values.reduce(
          (combined, marketCaps) => {
            marketCaps?.forEach(
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
        )
    }),
    // altcoinsWithoutEthAndStablesMarketCap: createLazyDataset(() => ),
    mergedExtremes: createExtremeQuantilesDataset(() => [
      localExtremes,
      cycleExtremes,
    ]),

    localExtremes,
    cycleExtremes,
    yearlyMA,
    monthlyMA,
    weeklyMA,
  }
}
