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
        color: assignedColors.fish,
        multiplier,
        autoscale,
        // title: `x${multiplier}`,
      })

      const { fishRealizedPrice } = datasets

      fishRealizedPrice.fetch()

      createEffect(() => {
        series.setData(fishRealizedPrice.values() || [])
      })

      return series
    }
  )
}
