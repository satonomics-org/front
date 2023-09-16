import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
  })
  ;[
    {
      dataset: datasets.humpbacksBalances,
      color: colors.humpbacks,
      title: 'Humpbacks',
    },
    {
      dataset: datasets.whalesBalances,
      color: colors.whales,
      title: 'Whales',
    },
    {
      dataset: datasets.sharksBalances,
      color: colors.sharks,
      title: 'Sharks',
    },
    {
      dataset: datasets.fishBalances,
      color: colors.fish,
      title: 'Fish',
    },
    {
      dataset: datasets.crabsBalances,
      color: colors.crabs,
      title: 'Crabs',
    },
    {
      dataset: datasets.shrimpsBalances,
      color: colors.shrimps,
      title: 'Shrimps',
    },
    {
      dataset: datasets.planktonBalances,
      color: colors.plankton,
      title: 'Plankton',
    },
  ].forEach(({ dataset, color, title }) => {
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
