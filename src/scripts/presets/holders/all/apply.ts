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
      title: 'All',
    },
    {
      dataset: datasets.lthRealizedPrice,
      color: assignedColors.lth,
      title: 'LTH',
    },
    {
      dataset: datasets.twoYearRealizedPrice,
      color: assignedColors.twoYear,
      title: '<2y',
    },
    {
      dataset: datasets.sthRealizedPrice,
      color: assignedColors.sth,
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
