import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { sharksRealizedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [{ multiplier: 1, autoscale: false }].map(
    ({ multiplier, autoscale }) => {
      const series = createLineSeries({
        chart,
        color: sharksRealizedPriceColor,
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
