import { PriceScaleMode } from 'lightweight-charts'

import {
  colors,
  createLineSeries,
  darken,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyAveragesPreset = (params: {
  chart: IChartApi
  dataset: DatasetWithAverages
  gradient: 'red' | 'green' | 'violet'
  log?: boolean
}): ReturnType<ApplyPreset> => {
  const { chart, dataset, gradient, log } = params

  resetLeftPriceScale(chart, {
    visible: true,
    mode: log ? PriceScaleMode.Logarithmic : undefined,
    halved: true,
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
    color: darken(palette.daily),
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
    color: colors.white(),
    title: '1Y MA',
  })

  createEffect(() => daily.setData(dataset.values() || []))
  createEffect(() => weekly.setData(dataset.averages.weekly() || []))
  createEffect(() => monthly.setData(dataset.averages.monthly() || []))
  createEffect(() => yearly.setData(dataset.averages.yearly() || []))

  return {
    halved: true,
  }
}
