import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { midPointPriceColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: midPointPriceColor,
    autoscale: false,
  })

  const { cvdd, terminalPrice } = datasets

  cvdd.fetch()
  terminalPrice.fetch()

  createEffect(() => {
    const cvddValues = cvdd.values()
    const terminalValues = terminalPrice.values()

    if (!cvddValues || !terminalValues) return

    const mid = terminalValues.map((data, index) => ({
      ...data,
      value: (data.value + cvddValues[index].value) / 2,
    }))

    series.setData(mid)
  })

  return [series]
}
