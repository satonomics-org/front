import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { realizedPriceColor } from '../../realized/price'
import { crabsRealizedPriceColor } from '../crabs'
import { fishRealizedPriceColor } from '../fish'
import { humpbacksRealizedPriceColor } from '../humpbacks'
import { planktonRealizedPriceColor } from '../plankton'
import { sharksRealizedPriceColor } from '../sharks'
import { shrimpsRealizedPriceColor } from '../shrimps'
import { whalesRealizedPriceColor } from '../whales'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [
    {
      dataset: datasets.realizedPrice,
      color: realizedPriceColor,
      title: 'Combined',
      autoscale: false,
    },
    {
      dataset: datasets.humpbacksRealizedPrice,
      color: humpbacksRealizedPriceColor,
      title: 'Humpbacks',
      autoscale: false,
    },
    {
      dataset: datasets.whalesRealizedPrice,
      color: whalesRealizedPriceColor,
      title: 'Whales',
      autoscale: false,
    },
    {
      dataset: datasets.sharksRealizedPrice,
      color: sharksRealizedPriceColor,
      title: 'Sharks',
      autoscale: false,
    },
    {
      dataset: datasets.fishRealizedPrice,
      color: fishRealizedPriceColor,
      title: 'Fish',
    },
    {
      dataset: datasets.crabsRealizedPrice,
      color: crabsRealizedPriceColor,
      autoscale: false,
      title: 'Crabs',
    },
    {
      dataset: datasets.shrimpsRealizedPrice,
      color: shrimpsRealizedPriceColor,
      autoscale: false,
      title: 'Shrimps',
    },
    {
      dataset: datasets.planktonRealizedPrice,
      color: planktonRealizedPriceColor,
      autoscale: false,
      title: 'Plankton',
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
