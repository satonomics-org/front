import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [
    {
      dataset: datasets.realizedPrice,
      color: assignedColors.realized,
      title: 'Combined',
      autoscale: false,
    },
    {
      dataset: datasets.humpbacksRealizedPrice,
      color: assignedColors.humpbacks,
      title: 'Humpbacks',
      autoscale: false,
    },
    {
      dataset: datasets.whalesRealizedPrice,
      color: assignedColors.whales,
      title: 'Whales',
      autoscale: false,
    },
    {
      dataset: datasets.sharksRealizedPrice,
      color: assignedColors.sharks,
      title: 'Sharks',
      autoscale: false,
    },
    {
      dataset: datasets.fishRealizedPrice,
      color: assignedColors.fish,
      title: 'Fish',
    },
    {
      dataset: datasets.crabsRealizedPrice,
      color: assignedColors.crabs,
      autoscale: false,
      title: 'Crabs',
    },
    {
      dataset: datasets.shrimpsRealizedPrice,
      color: assignedColors.shrimps,
      autoscale: false,
      title: 'Shrimps',
    },
    {
      dataset: datasets.planktonRealizedPrice,
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
    })

    dataset.fetch()

    createEffect(() => {
      series.setData(dataset.values() || [])
    })

    return series
  })
}
