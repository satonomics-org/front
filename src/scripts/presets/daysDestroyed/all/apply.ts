import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { realizedPriceColor } from '../../realized/price'
import { balancedPriceColor } from '../balanced'
import { cvddColor } from '../cvdd'
import { terminalPriceColor } from '../terminal'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [
    {
      dataset: datasets.terminalPrice,
      color: terminalPriceColor,
      title: 'Terminal',
      autoscale: false,
    },
    {
      dataset: datasets.cvdd,
      color: cvddColor,
      title: 'CVDD',
      autoscale: false,
    },
    {
      dataset: datasets.balancedPrice,
      color: balancedPriceColor,
      title: 'Balanced',
      autoscale: false,
    },
    {
      dataset: datasets.realizedPrice,
      color: realizedPriceColor,
      title: 'Realized',
      autoscale: false,
    },
  ].map(({ dataset, color, autoscale, title }) => {
    const series = createLineSeries({
      chart,
      color,
      autoscale,
      title,
    })

    dataset.fetch()

    createEffect(() => {
      series.setData(dataset.values() || [])
    })

    return series
  })
}
