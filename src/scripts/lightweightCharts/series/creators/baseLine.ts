import { colors, defaultSeriesOptions } from '/src/scripts'

type BaseLineOptions = DeepPartial<BaselineStyleOptions & SeriesOptionsCommon>

export const createBaseLineSeries = (
  chart: IChartApi,
  options: {
    color?: string
    topColor?: string
    topLineColor?: string
    bottomColor?: string
    bottomLineColor?: string
    lineColor?: string
    base?: number
    options?: BaseLineOptions
    title?: string
  },
) => {
  const {
    title,
    color,
    topColor,
    topLineColor,
    bottomColor,
    bottomLineColor,
    base,
    lineColor,
  } = options

  const allTopColor = topColor || color
  const allBottomColor = bottomColor || color

  const seriesOptions: BaseLineOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    ...options,
    ...(base ? { baseValue: { type: 'price', price: 1 } } : {}),
    topLineColor: topLineColor || lineColor || allTopColor,
    topFillColor1: allTopColor,
    topFillColor2: allTopColor,
    bottomLineColor: bottomLineColor || lineColor || allBottomColor,
    bottomFillColor1: allBottomColor,
    bottomFillColor2: allBottomColor,
    title,
  }

  const series = chart.addBaselineSeries(seriesOptions)

  return series
}
