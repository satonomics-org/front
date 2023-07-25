import { colors, selfAPI } from '/src/scripts'

import {
  createHistogramSeries,
  resetLeftPriceScale,
} from '../../app/scripts/chart'

export const createFundingRatesSeries: CreateSeries = async (chart, signal) => {
  resetLeftPriceScale(chart, {
    visible: true,
  })

  const dataset = await selfAPI.fetchFundingRates(signal)

  return [
    createHistogramSeries({
      chart,
      dataset: dataset.map((data) => ({
        ...data,
        value: data.value * 100,
        color: `${data.value >= 0 ? colors.green : colors.red}bb`,
      })),
    }),
  ]
}
