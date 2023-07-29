import { defaultSeriesOptions } from './defaults'

type AreaOptions = LightweightCharts.DeepPartial<
  LightweightCharts.AreaStyleOptions & LightweightCharts.SeriesOptionsCommon
>

export const createAreaSeries = (params: {
  chart: LightweightCharts.IChartApi
  dataset: LightweightCharts.LineData[]
  color?: string
  options?: AreaOptions
}) => {
  const { chart, dataset, options } = params

  const seriesOptions: AreaOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    ...options,
    // color,
  }

  const series = chart.addAreaSeries(seriesOptions)

  series.setData(dataset)

  return series
}
