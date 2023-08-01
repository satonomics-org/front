import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: assignedColors.balanced,
    autoscale: false,
  })

  const { balancedPrice } = datasets

  balancedPrice.fetch()

  createEffect(() => {
    series.setData(balancedPrice.values() || [])
  })

  return [series]
}
