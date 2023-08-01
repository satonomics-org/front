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
        color: assignedColors.humpbacks,
        multiplier,
        autoscale,
        // title: `x${multiplier}`,
      })

      const { humpbacksRealizedPrice } = datasets

      humpbacksRealizedPrice.fetch()

      createEffect(() => {
        series.setData(humpbacksRealizedPrice.values() || [])
      })

      return series
    }
  )
}
