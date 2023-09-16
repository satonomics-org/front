import {
  colors,
  createHistogramSeries,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
  })

  const daily = createHistogramSeries(chart, {
    priceScaleId: 'left',
    title: 'Raw',
  })

  const weekly = createLineSeries(chart, {
    color: colors.yellow[500],
    priceScaleId: 'left',
    title: '1W MA',
  })

  const monthly = createLineSeries(chart, {
    color: colors.white(),
    priceScaleId: 'left',
    title: '1W MA',
  })

  const { netRealizedProfitAndLoss } = datasets

  createEffect(() => daily.setData(netRealizedProfitAndLoss.values() || []))

  createEffect(() => weekly.setData(netRealizedProfitAndLoss.averages.weekly()))

  createEffect(() =>
    monthly.setData(netRealizedProfitAndLoss.averages.monthly()),
  )

  return {
    halved: true,
  }
}
