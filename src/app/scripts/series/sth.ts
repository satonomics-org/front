import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '..'

export const createSTHRealizedPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchSTHRealizedPrice(signal)

  const color = colors.amber

  return [
    { multiplier: 1.75 },
    { multiplier: 1.4 },
    { multiplier: 1, autoscale: false },
    { multiplier: 0.8 },
    { multiplier: 0.6 },
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
