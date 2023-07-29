import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

import { cvddColor } from '.'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: cvddColor,
    autoscale: false,
  })

  const { cvdd } = datasets

  cvdd.fetch()

  createEffect(() => {
    series.setData(cvdd.values() || [])
  })

  return [series]
}
