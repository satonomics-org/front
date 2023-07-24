import { defaultLineOptions } from './defaults'

type LineOptions = LightweightCharts.DeepPartial<
  LightweightCharts.LineStyleOptions & LightweightCharts.SeriesOptionsCommon
>

export const createLineSeries = (params: {
  chart: LightweightCharts.IChartApi
  dataset: LightweightCharts.LineData[]
  color: string
  autoscale?: boolean
  multiplier?: number
  options?: LineOptions
  title?: string
}) => {
  const { chart, dataset, color, multiplier, autoscale, options, title } =
    params

  const isDefault = !multiplier || multiplier === 1

  const seriesOptions: LineOptions = {
    ...defaultLineOptions,
    color: isDefault ? color : `${color}88`,
    ...options,
    ...(options?.priceScaleId || autoscale === false
      ? { autoscaleInfoProvider: undefined }
      : {}),
    title,
  }

  const series = chart.addLineSeries(seriesOptions)

  series.setData(
    isDefault
      ? dataset
      : dataset.map(({ time, value }) => ({
          time,
          value: value * multiplier,
        }))
  )

  return series
}
