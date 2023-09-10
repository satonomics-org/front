import { createAutoscaleInfoProvider, defaultSeriesOptions } from '/src/scripts'

type LineOptions = DeepPartial<LineStyleOptions & SeriesOptionsCommon>

export const createLineSeries = (chart: IChartApi, options?: LineOptions) => {
  const seriesOptions: LineOptions = {
    ...defaultSeriesOptions,
    ...(!options?.priceScaleId
      ? { autoscaleInfoProvider: createAutoscaleInfoProvider() }
      : {}),
    ...options,
  }

  const series = chart.addLineSeries(seriesOptions)

  return series
}
