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
      dataset: datasets.humpbacksDistribution,
      color: assignedColors.humpbacks,
      title: 'Humpbacks',
      autoscale: false,
    },
    {
      dataset: datasets.whalesDistribution,
      color: assignedColors.whales,
      title: 'Whales',
      autoscale: false,
    },
    {
      dataset: datasets.sharksDistribution,
      color: assignedColors.sharks,
      title: 'Sharks',
      autoscale: false,
    },
    {
      dataset: datasets.fishDistribution,
      color: assignedColors.fish,
      title: 'Fish',
    },
    {
      dataset: datasets.crabsDistribution,
      color: assignedColors.crabs,
      autoscale: false,
      title: 'Crabs',
    },
    {
      dataset: datasets.shrimpsDistribution,
      color: assignedColors.shrimps,
      autoscale: false,
      title: 'Shrimps',
    },
    {
      dataset: datasets.planktonDistribution,
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
