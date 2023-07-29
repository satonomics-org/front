import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { shrimpsRealizedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [{ multiplier: 1, autoscale: false }].map(
    ({ multiplier, autoscale }) => {
      const series = createLineSeries({
        chart,
        color: shrimpsRealizedPriceColor,
        multiplier,
        autoscale,
        // title: `x${multiplier}`,
      })

      const { shrimpsRealizedPrice } = datasets

      shrimpsRealizedPrice.fetch()

      createEffect(() => {
        series.setData(shrimpsRealizedPrice.values() || [])
      })

      return series
    }
  )
}
