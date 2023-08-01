import { defaultSeriesOptions } from './defaults'

type HistogramOptions = LightweightCharts.DeepPartial<
  LightweightCharts.HistogramStyleOptions &
    LightweightCharts.SeriesOptionsCommon
>

export const createHistogramSeries = (params: {
  chart: LightweightCharts.IChartApi
  color?: string
  options?: HistogramOptions
  title?: string
}) => {
  const { chart, color, options, title } = params

  const seriesOptions: HistogramOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    ...options,
    color,
    title,
  }

  const series = chart.addHistogramSeries(seriesOptions)

  return series
}
