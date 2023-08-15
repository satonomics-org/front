import { LineType } from 'lightweight-charts'

import { createAutoscaleInfoProvider } from './autoScale'

export const defaultSeriesOptions: LightweightCharts.DeepPartial<LightweightCharts.SeriesOptionsCommon> =
  {
    // @ts-ignore
    lineWidth: 1.5,
    priceLineVisible: false,
    lastValueVisible: false,
  }

export const defaultLineOptions: LightweightCharts.DeepPartial<
  LightweightCharts.LineStyleOptions & LightweightCharts.SeriesOptionsCommon
> = {
  ...defaultSeriesOptions,
  lineType: LineType.Curved,
  autoscaleInfoProvider: createAutoscaleInfoProvider(),
}
