import {
  colors,
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  createHistogramSeries,
  createLineSeries,
  getCurrentWhiteColor,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, { visible: true })

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
    color: getCurrentWhiteColor(),
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
        color: `${data.value < 0 ? colors.pink[500] : colors.teal[500]}88`,
      })),
    )

    weekly.setData(computeWeeklyMovingAverage(dataset))

    monthly.setData(computeMonthlyMovingAverage(dataset))
  })
}
