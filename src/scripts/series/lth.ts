import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../../app/scripts'

export const createLTHRealizedPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchLTHRealizedPrice(signal)

  const color = colors.cyan

  return [
    { multiplier: 30 },
    { multiplier: 10 },
    { multiplier: 4 },
    { multiplier: 2 },
    {
      multiplier: 1,
      autoscale: false,
    },
    { multiplier: 0.8 },
  ].map(({ multiplier, autoscale }) =>
    createLineSeries({
      chart,
      dataset,
      color,
      multiplier,
      autoscale,
      title: `x${multiplier}`,
    })
  )
}
