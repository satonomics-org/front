import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { balancedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: balancedPriceColor,
    autoscale: false,
  })

  const { balancedPrice } = datasets

  balancedPrice.fetch()

  createEffect(() => {
    series.setData(balancedPrice.values() || [])
  })

  return [series]
}
