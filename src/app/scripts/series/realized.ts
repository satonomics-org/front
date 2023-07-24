import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../chart'

export const createRealizedPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchRealizedPrice(signal)

  return [
    createLineSeries({
      chart,
      dataset,
      color: colors.orange,
      autoscale: false,
    }),
  ]
}
