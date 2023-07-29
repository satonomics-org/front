import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { planktonRealizedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [{ multiplier: 1, autoscale: false }].map(
    ({ multiplier, autoscale }) => {
      const series = createLineSeries({
        chart,
        color: planktonRealizedPriceColor,
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
