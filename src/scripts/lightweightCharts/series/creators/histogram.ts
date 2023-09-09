import { defaultSeriesOptions } from '/src/scripts'

type HistogramOptions = DeepPartial<HistogramStyleOptions & SeriesOptionsCommon>

export const createHistogramSeries = (
  chart: IChartApi,
  options?: HistogramOptions,
) => {
  const seriesOptions: HistogramOptions = {
    priceScaleId: 'left',
    ...defaultSeriesOptions,
    ...options,
  }

  const series = chart.addHistogramSeries(seriesOptions)

  return series
}
