import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { crabsRealizedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [{ multiplier: 1, autoscale: false }].map(
    ({ multiplier, autoscale }) => {
      const series = createLineSeries({
        chart,
        color: crabsRealizedPriceColor,
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
