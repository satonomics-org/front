import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { terminalPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: terminalPriceColor,
    autoscale: false,
  })

  const { terminalPrice } = datasets

  terminalPrice.fetch()

  createEffect(() => {
    series.setData(terminalPrice.values() || [])
  })

  return [series]
}
