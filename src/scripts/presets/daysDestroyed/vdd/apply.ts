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

  const { vddMultiple } = datasets

  vddMultiple.fetch()

  createEffect(() => series.setData(vddMultiple.values() || []))

  return {
    halved: true,
  }
}
