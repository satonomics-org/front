import {
  colors,
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  createHistogramSeries,
  createLineSeries,
  darken,
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

  netRealizedProfitAndLoss.fetch()

  createEffect(() => {
    const dataset = netRealizedProfitAndLoss.values() || []

    daily.setData(
      dataset.map((data) => ({
        ...data,
        color: darken(data.value < 0 ? colors.down : colors.up),
      })),
    )

    weekly.setData(computeWeeklyMovingAverage(dataset))

    monthly.setData(computeMonthlyMovingAverage(dataset))
  })

  return {
    halved: true,
  }
}
