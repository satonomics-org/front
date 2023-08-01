import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: assignedColors.cvdd,
    autoscale: false,
  })

  const { cvdd } = datasets

  cvdd.fetch()

  createEffect(() => {
    series.setData(cvdd.values() || [])
  })

  return [series]
}
