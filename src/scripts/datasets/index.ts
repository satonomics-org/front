import {
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
  convertCandlesticksToSingleValueDataset,
} from '/src/scripts'

import { addAverages } from './averages'
import { addQuantiles as _addQuantiles } from './quantiles'

export { USABLE_CANDLESTICKS_START_DATE } from './quantiles'

const createDataset = <Value extends LightweightCharts.WhitespaceData>(
  resource: Resource<Value>,
): Dataset<Value> => ({
  values: resource.values,
  fetch: resource.fetch,
})

export const createDatasets = (resources: Resources) => {
  const candlesticksCloses = createMemo(
    () =>
      convertCandlesticksToSingleValueDataset(resources.candlesticks.values()),
    {
      equals: (
        prev: LightweightCharts.SingleValueData[],
        next: LightweightCharts.SingleValueData[],
      ) => prev.length === next.length,
    },
  )

  const candlestickClosesRecord = createMemo(() =>
    candlesticksCloses().reduce(
      (obj, data) => {
        obj[data.time as string] = data.value
        return obj
      },
      {} as Record<string, number>,
    ),
  )

  const addQuantiles = (dataset: Dataset<LightweightCharts.SingleValueData>) =>
    _addQuantiles(dataset, candlesticksCloses)

  const datasets: Datasets = {
    candlesticks: createDataset(resources.candlesticks),
    weeklyMA: addQuantiles({
      fetch: resources.candlesticks.fetch,
      values: createMemo(() =>
        computeWeeklyMovingAverage(candlesticksCloses()),
      ),
    }),
    monthlyMA: addQuantiles({
      fetch: resources.candlesticks.fetch,
      values: createMemo(() =>
        computeMonthlyMovingAverage(candlesticksCloses()),
      ),
    }),
    yearlyMA: addQuantiles({
      fetch: resources.candlesticks.fetch,
      values: createMemo(() =>
        computeYearlyMovingAverage(candlesticksCloses()),
      ),
    }),
    transactedVolume: createDataset(resources.transactedVolume),
    sthRealizedPrice: addQuantiles(createDataset(resources.sthRealizedPrice)),
    lthRealizedPrice: addQuantiles(createDataset(resources.lthRealizedPrice)),
    oneMonthRealizedPrice: addQuantiles(
      createDataset(resources.oneMonthRealizedPrice),
    ),
    threeMonthsRealizedPrice: addQuantiles(
      createDataset(resources.threeMonthsRealizedPrice),
    ),
    sixMonthsRealizedPrice: addQuantiles(
      createDataset(resources.sixMonthsRealizedPrice),
    ),
    oneYearRealizedPrice: addQuantiles(
      createDataset(resources.oneYearRealizedPrice),
    ),
    twoYearsRealizedPrice: addQuantiles(
      createDataset(resources.twoYearsRealizedPrice),
    ),
    netRealizedProfitAndLoss: createDataset(resources.netRealizedProfitAndLoss),
    sopr: createDataset(resources.sopr),
    planktonRealizedPrice: addQuantiles(
      createDataset(resources.planktonRealizedPrice),
    ),
    shrimpsRealizedPrice: addQuantiles(
      createDataset(resources.shrimpsRealizedPrice),
    ),
    crabsRealizedPrice: addQuantiles(
      createDataset(resources.crabsRealizedPrice),
    ),
    fishRealizedPrice: addQuantiles(createDataset(resources.fishRealizedPrice)),
    sharksRealizedPrice: addQuantiles(
      createDataset(resources.sharksRealizedPrice),
    ),
    whalesRealizedPrice: addQuantiles(
      createDataset(resources.whalesRealizedPrice),
    ),
    humpbacksRealizedPrice: addQuantiles(
      createDataset(resources.humpbacksRealizedPrice),
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
    terminalPrice: addQuantiles(createDataset(resources.terminalPrice)),
    realizedPrice: addQuantiles(createDataset(resources.realizedPrice)),
    balancedPrice: addQuantiles(createDataset(resources.balancedPrice)),
    cvdd: addQuantiles(createDataset(resources.cvdd)),
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
    minersRevenueInDollars: addAverages({
      fetch: resources.minersRevenue.fetch,
      values: createMemo(() =>
        (resources.minersRevenue.values() || []).map((data) => ({
          time: data.time,
          value: data.value * candlestickClosesRecord()[data.time as string],
        })),
      ),
    }),
    puellMultiple: addAverages({
      fetch: resources.minersRevenue.fetch,
      values: createMemo(() => {
        const dailyDataset = (resources.minersRevenue.values() || []).map(
          (data) => ({
            time: data.time,
            value: data.value * candlestickClosesRecord()[data.time as string],
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
  }

  return datasets
}
