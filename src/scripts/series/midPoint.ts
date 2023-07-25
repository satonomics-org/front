import { colors, selfAPI } from '/src/scripts'

import { createLineSeries, resetLeftPriceScale } from '../../app/scripts/chart'

export const createMidPointPriceSeries: CreateSeries = async (
  chart,
  signal
) => {
  resetLeftPriceScale(chart)

  const terminal = await selfAPI.fetchTerminalPrice(signal)
  const cvdd = await selfAPI.fetchCVDD(signal)

  return [
    {
      dataset: terminal,
      color: `${colors.red}88`,
      title: 'Terminal',
    },
    {
      dataset: terminal.map((data, index) => ({
        ...data,
        value: (data.value + cvdd[index].value) / 2,
      })),
      color: colors.amber,
      autoscale: false,
      title: 'Mid',
    },
    {
      dataset: cvdd,
      color: `${colors.lime}44`,
      title: 'CVDD',
    },
  ].map(({ dataset, color, autoscale, title }) =>
    createLineSeries({
      chart,
      dataset,
      color,
      autoscale,
      title,
    })
  )
}
