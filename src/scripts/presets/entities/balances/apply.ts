import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
  })

  return [
    {
      dataset: datasets.humpbacksBalances,
      color: assignedColors.humpbacks,
      title: 'Humpbacks',
      autoscale: false,
    },
    {
      dataset: datasets.whalesBalances,
      color: assignedColors.whales,
      title: 'Whales',
      autoscale: false,
    },
    {
      dataset: datasets.sharksBalances,
      color: assignedColors.sharks,
      title: 'Sharks',
      autoscale: false,
    },
    {
      dataset: datasets.fishBalances,
      color: assignedColors.fish,
      title: 'Fish',
    },
    {
      dataset: datasets.crabsBalances,
      color: assignedColors.crabs,
      autoscale: false,
      title: 'Crabs',
    },
    {
      dataset: datasets.shrimpsBalances,
      color: assignedColors.shrimps,
      autoscale: false,
      title: 'Shrimps',
    },
    {
      dataset: datasets.planktonBalances,
      color: assignedColors.plankton,
      autoscale: false,
      title: 'Plankton',
    },
  ].map(({ dataset, color, autoscale, title }) => {
    const series = createLineSeries({
      chart,
      color,
      autoscale,
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
