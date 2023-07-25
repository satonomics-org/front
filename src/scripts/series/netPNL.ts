import { colors, movingAverage, selfAPI } from '/src/scripts'

import {
  createBaseLineSeries,
  createLineSeries,
  resetLeftPriceScale,
} from '../../app/scripts/chart'

export const createNetRealizedProfitAndLossSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart, { visible: true })

  const dataset = await selfAPI.fetchNetRealizedProfitAndLoss(signal)

  return [
    ...[
      {
        dataset: dataset.map((data) => ({ ...data, value: 0 })),
        color: `${colors.white}88`,
      },
      { dataset, color: `${colors.blue}88` },
    ].map(({ dataset, color }) =>
      createLineSeries({
        chart,
        dataset,
        color,
        options: {
          priceScaleId: 'left',
        },
      })
    ),
    createBaseLineSeries({
      chart,
      dataset: movingAverage(dataset, 7),
      color: `${colors.orange}bb`,
    }),
  ]
}
