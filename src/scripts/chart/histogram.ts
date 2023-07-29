import { defaultSeriesOptions } from './defaults'

type HistogramOptions = LightweightCharts.DeepPartial<
  LightweightCharts.HistogramStyleOptions &
    LightweightCharts.SeriesOptionsCommon
>

export const createHistogramSeries = (params: {
  chart: LightweightCharts.IChartApi
  color?: string
  options?: HistogramOptions
}) => {
  const { chart, color, options } = params

  const seriesOptions: HistogramOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    ...options,
    color,
  }

  const series = chart.addHistogramSeries(seriesOptions)

  return series
}
