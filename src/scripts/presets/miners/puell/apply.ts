import { PriceScaleMode } from 'lightweight-charts'

import {
  colors,
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
  createLineSeries,
  getCurrentWhiteColor,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets, candlesticks }) => {
  resetLeftPriceScale(chart, {
    mode: PriceScaleMode.Logarithmic,
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
    const closes = (candlesticks || []).reduce((obj, candlestick) => {
      obj[candlestick.time] = candlestick.close
      return obj
    }, {} as Record<string, number>)

    const dailyDataset = (minersRevenue.values() || []).map((data) => ({
      time: data.time,
      value: data.value * closes[data.time as string],
    }))

    const yearlyDataset = computeYearlyMovingAverage(dailyDataset)

    const dataset = dailyDataset.map(({ time, value }, index) => {
      const yearlyValue = yearlyDataset[index].value

      return {
        time,
        value: value / yearlyValue,
      }
    })

    daily.setData(dataset)
    weekly.setData(computeWeeklyMovingAverage(dataset))
    monthly.setData(computeMonthlyMovingAverage(dataset))
    yearly.setData(computeYearlyMovingAverage(dataset))
  })
}
