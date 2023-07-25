import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../../app/scripts/chart'

export const createCVDDSeries: CreateSeries = async (chart, signal) => {
  resetLeftPriceScale(chart)

  const dataset = await selfAPI.fetchCVDD(signal)

  return [
    createLineSeries({
      chart,
      dataset,
      color: colors.lime,
      autoscale: false,
    }),
  ]
}
