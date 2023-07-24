import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '..'

export const create2YRealizedPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetch2YRealizedPrice(signal)

  const color = colors.purple

  return [
    { multiplier: 3 },
    { multiplier: 2.4 },
    { multiplier: 1.7 },
    { multiplier: 1, autoscale: false },
    { multiplier: 0.8 },
    { multiplier: 0.5 },
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
