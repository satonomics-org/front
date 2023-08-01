import { colors } from '/src/scripts'

import { defaultSeriesOptions } from './defaults'

type BaseLineOptions = LightweightCharts.DeepPartial<
  LightweightCharts.BaselineStyleOptions & LightweightCharts.SeriesOptionsCommon
>

export const createBaseLineSeries = (params: {
  chart: LightweightCharts.IChartApi
  color?: string
  topColor?: string
  topLineColor?: string
  bottomColor?: string
  bottomLineColor?: string
  lineColor?: string
  base?: number
  options?: BaseLineOptions
  title?: string
}) => {
  const {
    chart,
    options,
    title,
    color,
    topColor,
    topLineColor,
    bottomColor,
    bottomLineColor,
    base,
    lineColor,
  } = params

  const allTopColor = topColor || color
  const allBottomColor = bottomColor || color

  const seriesOptions: BaseLineOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    ...options,
    ...(base ? { baseValue: { type: 'price', price: 1 } } : {}),
    topLineColor: topLineColor || lineColor || allTopColor,
    topFillColor1: colors.black,
    topFillColor2: allTopColor,
    bottomLineColor: bottomLineColor || lineColor || allBottomColor,
    bottomFillColor1: allBottomColor,
    bottomFillColor2: colors.black,
    title,
  }

  const series = chart.addBaselineSeries(seriesOptions)

  return series
}
