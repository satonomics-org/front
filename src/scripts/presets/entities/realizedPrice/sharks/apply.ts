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
        color: assignedColors.sharks,
        multiplier,
        autoscale,
        // title: `x${multiplier}`,
      })

      const { sharksRealizedPrice } = datasets

      sharksRealizedPrice.fetch()

      createEffect(() => {
        series.setData(sharksRealizedPrice.values() || [])
      })

      return series
    }
  )
}
