import {
  colors,
  createHistogramSeries,
  createLineSeries,
  resetLeftPriceScale,
  weeklyMovingAverage,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, { visible: true })

  const daily = createHistogramSeries({
    chart,
    options: {
      priceScaleId: 'left',
    },
    title: 'Raw',
  })

  const weekly = createLineSeries({
    chart,
    color: colors.white,
    options: {
      priceScaleId: 'left',
    },
    title: '1W MA',
  })

  const { netRealizedProfitAndLoss } = datasets

  netRealizedProfitAndLoss.fetch()

  createEffect(() => {
    const dataset = netRealizedProfitAndLoss.values() || []

    daily.setData(
      dataset.map((data) => ({
        ...data,
        color: data.value < 0 ? colors.pink : colors.teal,
      }))
    )

    weekly.setData(weeklyMovingAverage(dataset))
  })

  return [daily, weekly]
}
