import { PriceScaleMode } from 'lightweight-charts'

import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
  })
  ;[
    {
      dataset: datasets.humpbacksDistribution,
      color: colors.humpbacks,
      title: 'Humpbacks',
    },
    {
      dataset: datasets.whalesDistribution,
      color: colors.whales,
      title: 'Whales',
    },
    {
      dataset: datasets.sharksDistribution,
      color: colors.sharks,
      title: 'Sharks',
    },
    {
      dataset: datasets.fishDistribution,
      color: colors.fish,
      title: 'Fish',
    },
    {
      dataset: datasets.crabsDistribution,
      color: colors.crabs,
      title: 'Crabs',
    },
    {
      dataset: datasets.shrimpsDistribution,
      color: colors.shrimps,
      title: 'Shrimps',
    },
    {
      dataset: datasets.planktonDistribution,
      color: colors.plankton,
      title: 'Plankton',
    },
  ].map(({ dataset, color, title }) => {
    const series = createLineSeries(chart, {
      color,
      title,
      priceScaleId: 'left',
    })

    createEffect(() => series.setData(dataset.values() || []))
  })

  return {
    halved: true,
  }
}
