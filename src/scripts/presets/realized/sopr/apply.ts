import { colors, createBaseLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, { visible: true })

  const series = createBaseLineSeries({
    chart,
    topColor: `${colors.up}88`,
    bottomColor: `${colors.down}88`,
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
