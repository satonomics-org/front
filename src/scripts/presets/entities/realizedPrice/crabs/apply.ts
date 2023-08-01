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
        color: assignedColors.crabs,
        multiplier,
        autoscale,
        // title: `x${multiplier}`,
      })

      const { crabsRealizedPrice } = datasets

      crabsRealizedPrice.fetch()

      createEffect(() => {
        series.setData(crabsRealizedPrice.values() || [])
      })

      return series
    }
  )
}
