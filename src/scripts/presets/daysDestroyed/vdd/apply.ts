import { createHistogramSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
    scaleMargins: {
      bottom: 0,
    },
  })

  const series = createHistogramSeries(chart)

  createEffect(() => series.setData(datasets.vddMultiple.values() || []))

  return {
    halved: true,
  }
}
