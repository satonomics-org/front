import { defaultSeriesOptions } from '/src/scripts'

type AreaOptions = DeepPartial<AreaStyleOptions & SeriesOptionsCommon>

export const createAreaSeries = (
  chart: IChartApi,
  options?: AreaOptions & {
    color?: string
  },
) => {
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
