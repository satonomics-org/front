import { LineType } from 'lightweight-charts'

import { createAutoscaleInfoProvider, defaultSeriesOptions } from '/src/scripts'

type LineOptions = DeepPartial<LineStyleOptions & SeriesOptionsCommon>

export const createLineSeries = (chart: IChartApi, options?: LineOptions) => {
  const seriesOptions: LineOptions = {
    ...defaultSeriesOptions,
    lineType: LineType.Curved,
    ...(!options?.priceScaleId
      ? { autoscaleInfoProvider: createAutoscaleInfoProvider() }
      : {}),
    ...options,
  }

  const series = chart.addLineSeries(seriesOptions)

  return series
}
