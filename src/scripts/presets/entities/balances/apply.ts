import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
  })
  ;[
    {
      dataset: datasets.humpbacksBalances,
      color: assignedColors.humpbacks,
      title: 'Humpbacks',
    },
    {
      dataset: datasets.whalesBalances,
      color: assignedColors.whales,
      title: 'Whales',
    },
    {
      dataset: datasets.sharksBalances,
      color: assignedColors.sharks,
      title: 'Sharks',
    },
    {
      dataset: datasets.fishBalances,
      color: assignedColors.fish,
      title: 'Fish',
    },
    {
      dataset: datasets.crabsBalances,
      color: assignedColors.crabs,
      title: 'Crabs',
    },
    {
      dataset: datasets.shrimpsBalances,
      color: assignedColors.shrimps,
      title: 'Shrimps',
    },
    {
      dataset: datasets.planktonBalances,
      color: assignedColors.plankton,
      title: 'Plankton',
    },
  ].map(({ dataset, color, title }) => {
    const series = createLineSeries({
      chart,
      color,
      title,
      options: {
        priceScaleId: 'left',
      },
    })

    dataset.fetch()

    createEffect(() => {
      series.setData(dataset.values() || [])
    })

    return series
  })
}
