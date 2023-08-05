import {
  colors,
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
  })

  const options = {
    priceScaleId: 'left',
  }

  const daily = createLineSeries({
    chart,
    color: `${colors.red}88`,
    options,
    title: 'Raw',
  })

  const weekly = createLineSeries({
    chart,
    color: colors.orange,
    options,
    title: '1W MA',
  })

  const monthly = createLineSeries({
    chart,
    color: colors.yellow,
    options,
    title: '1M MA',
  })

  const yearly = createLineSeries({
    chart,
    color: colors.white,
    options,
    title: '1Y MA',
  })

  const { minersRevenue } = datasets

  minersRevenue.fetch()

  createEffect(() => {
    const dataset = (minersRevenue.values() || []).map((data) => ({
      ...data,
    }))

    daily.setData(dataset)
    weekly.setData(computeWeeklyMovingAverage(dataset))
    monthly.setData(computeMonthlyMovingAverage(dataset))
    yearly.setData(computeYearlyMovingAverage(dataset))
  })
}
