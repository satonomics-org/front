import {
  colors,
  createLineSeries,
  monthlyMovingAverage,
  resetLeftPriceScale,
  yearlyMovingAverage,
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

  const monthly = createLineSeries({
    chart,
    color: colors.orange,
    options,
    title: '1M MA',
  })

  const yearly = createLineSeries({
    chart,
    color: colors.yellow,
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

    monthly.setData(monthlyMovingAverage(dataset))

    yearly.setData(yearlyMovingAverage(dataset))
  })

  return [daily, monthly, yearly]
}
