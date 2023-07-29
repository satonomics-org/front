import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { twoYearRealizedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [
    { multiplier: 3 },
    { multiplier: 2.4 },
    { multiplier: 1.7 },
    { multiplier: 1, autoscale: false },
    { multiplier: 0.8 },
    { multiplier: 0.5 },
  ].map(({ multiplier, autoscale }) => {
    const series = createLineSeries({
      chart,
      color: twoYearRealizedPriceColor,
      multiplier,
      autoscale,
      title: `x${multiplier}`,
    })

    const { twoYearRealizedPrice } = datasets

    twoYearRealizedPrice.fetch()

    createEffect(() => {
      series.setData(
        (twoYearRealizedPrice.values() || []).map(({ time, value }) => ({
          time,
          value: value * multiplier,
        }))
      )
    })

    return series
  })
}
