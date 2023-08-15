import {
  colors,
  createHistogramSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
  })

  const series = createHistogramSeries({
    chart,
  })

  const { fundingRates } = datasets

  fundingRates.fetch()

  createEffect(() => {
    series.setData(
      (fundingRates.values() || []).map((data) => ({
        ...data,
        value: data.value * 100,
        color: `${data.value >= 0 ? colors.green : colors.red}bb`,
      })),
    )
  })
}
