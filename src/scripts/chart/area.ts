import { defaultSeriesOptions } from './defaults'

type AreaOptions = DeepPartial<AreaStyleOptions & SeriesOptionsCommon>

export const createAreaSeries = (params: {
  chart: IChartApi
  options?: AreaOptions & {
    color?: string
  }
}) => {
  const { chart, options } = params
  const { color } = options || {}

  const seriesOptions: AreaOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    lineColor: color,
    topColor: color,
    bottomColor: color,
    ...options,
  }

  const series = chart.addAreaSeries(seriesOptions)

  return series
}
