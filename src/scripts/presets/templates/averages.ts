import { PriceScaleMode } from 'lightweight-charts'

import { colors, createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyAveragesPreset = (params: {
  chart: IChartApi
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
          daily: colors.red[500],
          weekly: colors.orange[500],
          monthly: colors.yellow[500],
        }
      : gradient === 'green'
      ? {
          daily: colors.green[500],
          weekly: colors.lime[500],
          monthly: colors.yellow[500],
        }
      : {
          daily: colors.violet[500],
          weekly: colors.blue[500],
          monthly: colors.cyan[500],
        }

  const daily = createLineSeries(chart, {
    ...options,
    color: `${palette.daily}aa`,
    title: 'Raw',
  })

  const weekly = createLineSeries(chart, {
    ...options,
    color: palette.weekly,
    title: '1W MA',
  })

  const monthly = createLineSeries(chart, {
    ...options,
    color: palette.monthly,
    title: '1M MA',
  })

  const yearly = createLineSeries(chart, {
    ...options,
    color: `${colors.white}bb`,
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
