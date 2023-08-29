import { LineType } from 'lightweight-charts'

import { createAutoscaleInfoProvider } from './autoScale'
import { defaultSeriesOptions } from './defaults'

type LineOptions = DeepPartial<LineStyleOptions & SeriesOptionsCommon>

export const createLineSeries = (chart: IChartApi, options?: LineOptions) => {
  const seriesOptions: LineOptions = {
    ...defaultSeriesOptions,
    lineType: LineType.Curved,
    autoscaleInfoProvider: createAutoscaleInfoProvider(),
    ...options,
  }

  const series = chart.addLineSeries(seriesOptions)

  return series
}
