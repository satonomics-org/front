import { defaultSeriesOptions } from './defaults'

type BaseLineOptions = LightweightCharts.DeepPartial<
  LightweightCharts.BaselineStyleOptions & LightweightCharts.SeriesOptionsCommon
>

export const createBaseLineSeries = (params: {
  chart: LightweightCharts.IChartApi
  color: string
  options?: BaseLineOptions
}) => {
  const { chart, color, options } = params

  const seriesOptions: BaseLineOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    ...options,
    topLineColor: color,
    topFillColor1: color,
    topFillColor2: color,
    bottomLineColor: color,
    bottomFillColor1: color,
    bottomFillColor2: color,
  }

  const series = chart.addBaselineSeries(seriesOptions)

  return series
}
