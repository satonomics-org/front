import { PriceScaleMode } from 'lightweight-charts'

import {
  colors,
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyMovingAveragesPreset = (params: {
  chart: LightweightCharts.IChartApi
  dataset: DatasetResource
  gradient: 'red' | 'green' | 'violet'
  transformer?: (
    dataset: LightweightCharts.LineData[]
  ) => LightweightCharts.LineData[]
  log?: boolean
}) => {
  const { chart, dataset: datasetResource, gradient, log, transformer } = params

  resetLeftPriceScale(chart, {
    visible: true,
    mode: log ? PriceScaleMode.Logarithmic : undefined,
  })

  const options = {
    priceScaleId: 'left',
  }

  const palette =
    gradient === 'red'
      ? {
          daily: colors.red,
          weekly: colors.orange,
          monthly: colors.yellow,
        }
      : gradient === 'green'
      ? {
          daily: colors.green,
          weekly: colors.lime,
          monthly: colors.yellow,
        }
      : {
          daily: colors.violet,
          weekly: colors.blue,
          monthly: colors.cyan,
        }

  const daily = createLineSeries({
    chart,
    color: `${palette.daily}aa`,
    options,
    title: 'Raw',
  })

  const weekly = createLineSeries({
    chart,
    color: palette.weekly,
    options,
    title: '1W MA',
  })

  const monthly = createLineSeries({
    chart,
    color: palette.monthly,
    options,
    title: '1M MA',
  })

  const yearly = createLineSeries({
    chart,
    color: `${colors.white}bb`,
    options,
    title: '1Y MA',
  })

  datasetResource.fetch()

  createEffect(() => {
    const datasetValues = datasetResource.values() || []

    const dataset =
      transformer?.(datasetValues) ||
      datasetValues.map((data) => ({
        ...data,
      }))

    daily.setData(dataset)
    weekly.setData(computeWeeklyMovingAverage(dataset))
    monthly.setData(computeMonthlyMovingAverage(dataset))
    yearly.setData(computeYearlyMovingAverage(dataset))
  })
}
