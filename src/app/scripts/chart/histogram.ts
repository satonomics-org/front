import { defaultSeriesOptions } from './defaults'

type HistogramOptions = LightweightCharts.DeepPartial<
  LightweightCharts.HistogramStyleOptions &
    LightweightCharts.SeriesOptionsCommon
>

export const createHistogramSeries = (params: {
  chart: LightweightCharts.IChartApi
  dataset: LightweightCharts.HistogramData[]
  color?: string
  options?: HistogramOptions
}) => {
  const { chart, dataset, color, options } = params

  const seriesOptions: HistogramOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    ...options,
    color,
  }

  const series = chart.addHistogramSeries(seriesOptions)

  series.setData(dataset)

  return series
}
