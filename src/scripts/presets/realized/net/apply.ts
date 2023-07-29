import {
  colors,
  createBaseLineSeries,
  createHistogramSeries,
  movingAverage,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, { visible: true })

  const raw = createHistogramSeries({
    chart,
    color: `${colors.blue}88`,
    options: {
      priceScaleId: 'left',
    },
  })

  const ma = createBaseLineSeries({
    chart,
    color: `${colors.orange}bb`,
  })

  const { netRealizedProfitAndLoss } = datasets

  netRealizedProfitAndLoss.fetch()

  createEffect(() => {
    raw.setData(netRealizedProfitAndLoss.values() || [])

    ma.setData(movingAverage(netRealizedProfitAndLoss.values() || [], 7))
  })

  return [raw, ma]
}
