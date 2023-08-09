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
      dataset: datasets.humpbacksDistribution,
      color: assignedColors.humpbacks,
      title: 'Humpbacks',
    },
    {
      dataset: datasets.whalesDistribution,
      color: assignedColors.whales,
      title: 'Whales',
    },
    {
      dataset: datasets.sharksDistribution,
      color: assignedColors.sharks,
      title: 'Sharks',
    },
    {
      dataset: datasets.fishDistribution,
      color: assignedColors.fish,
      title: 'Fish',
    },
    {
      dataset: datasets.crabsDistribution,
      color: assignedColors.crabs,
      title: 'Crabs',
    },
    {
      dataset: datasets.shrimpsDistribution,
      color: assignedColors.shrimps,
      title: 'Shrimps',
    },
    {
      dataset: datasets.planktonDistribution,
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
  })
}
