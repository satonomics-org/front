import {
  colors,
  createBaseLineSeries,
  createHistogramSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, { visible: true })

  const series = createBaseLineSeries({
    chart,
    topColor: `${colors.green}88`,
    bottomColor: `${colors.red}88`,
    base: 1,
    options: {
      priceScaleId: 'left',
    },
  })

  const { sopr } = datasets

  sopr.fetch()

  createEffect(() => {
    series.setData(sopr.values() || [])
  })
}
