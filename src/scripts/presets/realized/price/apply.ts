import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: assignedColors.realized,
    autoscale: false,
  })

  const { realizedPrice } = datasets

  realizedPrice.fetch()

  createEffect(() => {
    series.setData(realizedPrice.values() || [])
  })

  return [series]
}
