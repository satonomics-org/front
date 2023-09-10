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

  sopr.fetch()

  createEffect(() => {
    series.setData(
      (sopr.values() || []).map((data) => ({
        ...data,
      })),
    )
  })

  return {
    halved: true,
  }
}
