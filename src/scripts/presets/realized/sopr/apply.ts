import { colors, createBaseLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
  })

  const series = createBaseLineSeries(chart, {
    topColor: colors.up,
    bottomColor: colors.down,
    base: 1,
    options: {
      priceScaleId: 'left',
    },
  })

  const { sopr } = datasets

  createEffect(() => series.setData(sopr.values() || []))

  return {
    halved: true,
  }
}
