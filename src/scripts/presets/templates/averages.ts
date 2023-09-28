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

  ;[
    {
      color: darken(palette.daily),
      title: 'Raw',
      dataset: dataset.values,
    },
    {
      color: palette.weekly,
      title: '1W MA',
      dataset: dataset.averages.weekly,
    },
    {
      color: palette.monthly,
      title: '1M MA',
      dataset: dataset.averages.monthly,
    },
    {
      color: colors.white(),
      title: '1Y MA',
      dataset: dataset.averages.yearly,
    },
  ].forEach(({ color, title, dataset }) => {
    const series = createLineSeries(chart, {
      ...options,
      color,
      title,
    })

    createEffect(() => series.setData(dataset() || []))
  })

  return {
    halved: true,
  }
}
