import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../../app/scripts/chart'

export const createTerminalPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchTerminalPrice(signal)

  return [
    createLineSeries({
      chart,
      dataset,
      color: colors.red,
      autoscale: false,
    }),
  ]
}
