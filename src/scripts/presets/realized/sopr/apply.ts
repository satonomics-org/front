import {
  colors,
  createHistogramSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, { visible: true })

  const series = createHistogramSeries({
    chart,
    color: `${colors.blue}88`,
    options: {
      priceScaleId: 'left',
    },
  })

  const { sopr } = datasets

  sopr.fetch()

  createEffect(() => {
    series.setData(sopr.values() || [])
  })

  return [series]
}
