import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { humpbacksRealizedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [{ multiplier: 1, autoscale: false }].map(
    ({ multiplier, autoscale }) => {
      const series = createLineSeries({
        chart,
        color: humpbacksRealizedPriceColor,
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
