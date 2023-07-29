import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { realizedPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: realizedPriceColor,
    autoscale: false,
  })

  const { realizedPrice } = datasets

  realizedPrice.fetch()

  createEffect(() => {
    series.setData(realizedPrice.values() || [])
  })

  return [series]
}
