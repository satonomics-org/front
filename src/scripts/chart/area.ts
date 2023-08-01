import { defaultSeriesOptions } from './defaults'

type AreaOptions = LightweightCharts.DeepPartial<
  LightweightCharts.AreaStyleOptions & LightweightCharts.SeriesOptionsCommon
>

export const createAreaSeries = (params: {
  chart: LightweightCharts.IChartApi
  color?: string
  options?: AreaOptions
  title?: string
}) => {
  const { chart, options, title, color } = params

  const seriesOptions: AreaOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    lineColor: color,
    topColor: color,
    bottomColor: color,
    ...options,
    title,
  }

  const series = chart.addAreaSeries(seriesOptions)

  return series
}
