import {
  assignedColors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart)

  const series = createLineSeries({
    chart,
    color: assignedColors.terminal,
    autoscale: false,
  })

  const { terminalPrice } = datasets

  terminalPrice.fetch()

  createEffect(() => {
    series.setData(terminalPrice.values() || [])
  })

  return [series]
}
