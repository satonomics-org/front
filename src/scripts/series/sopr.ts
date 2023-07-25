import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../../app/scripts/chart'

export const createSOPRSeries: CreateSeries = async (chart, signal) => {
  resetLeftPriceScale(chart, { visible: true })

  const dataset = await selfAPI.fetchSOPR(signal)

  return [
    ...[
      {
        dataset: dataset.map((data) => ({ ...data, value: 1 })),
        color: `${colors.white}bb`,
      },
      { dataset, color: `${colors.pink}dd` },
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
  ]
}
