import { PriceScaleMode } from 'lightweight-charts'

import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyAveragesPreset = (params: {
  chart: LightweightCharts.IChartApi
  dataset: DatasetWithAverages
  gradient: 'red' | 'green' | 'violet'
  log?: boolean
}) => {
  const { chart, dataset, gradient, log } = params

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

  dataset.fetch()

  createEffect(() => {
    daily.setData(dataset.values() || [])
    weekly.setData(dataset.averages.weekly() || [])
    monthly.setData(dataset.averages.monthly() || [])
    yearly.setData(dataset.averages.yearly() || [])
  })
}
