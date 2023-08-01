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
        color: assignedColors.plankton,
        multiplier,
        autoscale,
        // title: `x${multiplier}`,
      })

      const { planktonRealizedPrice } = datasets

      planktonRealizedPrice.fetch()

      createEffect(() => {
        series.setData(planktonRealizedPrice.values() || [])
      })

      return series
    }
  )
}
