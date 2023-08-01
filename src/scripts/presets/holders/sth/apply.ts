import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [
    { multiplier: 1.75 },
    { multiplier: 1.4 },
    { multiplier: 1, autoscale: false },
    { multiplier: 0.8 },
    { multiplier: 0.6 },
  ].map(({ multiplier, autoscale }) => {
    const series = createLineSeries({
      chart,
      color: assignedColors.sth,
      multiplier,
      autoscale,
      title: `x${multiplier}`,
    })

    const { sthRealizedPrice } = datasets

    sthRealizedPrice.fetch()

    createEffect(() => {
      series.setData(
        (sthRealizedPrice.values() || []).map(({ time, value }) => ({
          time,
          value: value * multiplier,
        }))
      )
    })

    return series
  })
}
