import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [{ multiplier: 1, autoscale: false }].map(
    ({ multiplier, autoscale }) => {
      const series = createLineSeries({
        chart,
        color: assignedColors.whales,
        multiplier,
        autoscale,
        // title: `x${multiplier}`,
      })

      const { whalesRealizedPrice } = datasets

      whalesRealizedPrice.fetch()

      createEffect(() => {
        series.setData(whalesRealizedPrice.values() || [])
      })

      return series
    }
  )
}
