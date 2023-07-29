import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { twoYearRealizedPriceColor } from '../2y'
import { realizedPriceColor } from '../../realized/price'
import { lthRealizedPriceColor } from '../lth'
import { sthRealizedPriceColor } from '../sth'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [
    {
      dataset: datasets.realizedPrice,
      color: realizedPriceColor,
      title: 'All',
    },
    {
      dataset: datasets.lthRealizedPrice,
      color: lthRealizedPriceColor,
      title: 'LTH',
    },
    {
      dataset: datasets.twoYearRealizedPrice,
      color: twoYearRealizedPriceColor,
      title: '<2y',
    },
    {
      dataset: datasets.sthRealizedPrice,
      color: sthRealizedPriceColor,
      autoscale: false,
      title: 'STH',
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
