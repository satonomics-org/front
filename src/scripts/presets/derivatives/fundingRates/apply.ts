import { createHistogramSeries, resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
  })

  const series = createHistogramSeries(chart)

  const { fundingRates } = datasets

  fundingRates.fetch()

  createEffect(() => series.setData(fundingRates.values() || []))

  return {
    halved: true,
  }
}
