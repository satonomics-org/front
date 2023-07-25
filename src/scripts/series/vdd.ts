import { colors, selfAPI } from '/src/scripts'

import {
  createHistogramSeries,
  resetLeftPriceScale,
} from '../../app/scripts/chart'

export const createVDDMultipleSeries: CreateSeries = async (chart, signal) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      top: 0.2,
      bottom: 0,
    },
  })

  const dataset = await selfAPI.fetchVDDMultiple(signal)

  return [
    createHistogramSeries({
      chart,
      dataset: dataset.map((data) => {
        const color = `${
          data.value >= 3
            ? colors.red
            : data.value >= 1
            ? colors.orange
            : colors.green
        }bb`

        return {
          ...data,
          value: data.value * 100,
          color: color,
        }
      }),
    }),
  ]
}
