import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../../app/scripts/chart'

export const createAgedRealizedPricesSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const sth = await selfAPI.fetchSTHRealizedPrice(signal)
  const twoYears = await selfAPI.fetch2YRealizedPrice(signal)
  const lth = await selfAPI.fetchLTHRealizedPrice(signal)

  return [
    { dataset: lth, color: colors.cyan, title: 'LTH' },
    {
      dataset: twoYears,
      color: colors.purple,
      title: '<2y',
    },
    {
      dataset: sth,
      color: colors.amber,
      autoscale: false,
      title: 'STH',
    },
  ].map(({ dataset, color, autoscale, title }) =>
    createLineSeries({ chart, dataset, color, autoscale, title })
  )
}
