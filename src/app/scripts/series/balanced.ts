import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../chart'

export const createBalancedPriceSeries = async (
  chart: LightweightCharts.IChartApi,
  signal: AbortSignal
) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchBalancedPrice(signal)

  return [
    createLineSeries({
      chart,
      dataset,
      color: colors.yellow,
      autoscale: false,
    }),
  ]
}
