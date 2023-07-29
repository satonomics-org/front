import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { lthRealizedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  return [
    { multiplier: 30 },
    { multiplier: 10 },
    { multiplier: 4 },
    { multiplier: 2 },
    {
      multiplier: 1,
      autoscale: false,
    },
    { multiplier: 0.8 },
  ].map(({ multiplier, autoscale }) => {
    const series = createLineSeries({
      chart,
      color: lthRealizedPriceColor,
      multiplier,
      autoscale,
      title: `x${multiplier}`,
    })

    const { lthRealizedPrice } = datasets

    lthRealizedPrice.fetch()

    createEffect(() => {
      series.setData(
        (lthRealizedPrice.values() || []).map(({ time, value }) => ({
          time,
          value: value * multiplier,
        }))
      )
    })

    return series
  })
}
