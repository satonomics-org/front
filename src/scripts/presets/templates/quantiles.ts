import {
  colors,
  createLineSeries,
  createQuantilesLineSeries,
  resetLeftPriceScale,
  setQuantilesDatasets,
} from '/src/scripts'

export const applyQuantilesPreset = (params: {
  chart: LightweightCharts.IChartApi
  color?: string
  datasetResource?: DatasetResource
  dataset?: LightweightCharts.SingleValueData[]
  candlesticks?: CandlestickDataWithVolume[]
  left?: true
}) => {
  const {
    chart,
    datasetResource,
    candlesticks,
    left,
    dataset: _dataset,
  } = params

  resetLeftPriceScale(chart, {
    visible: left,
  })

  const series = createLineSeries({
    chart,
    color: colors.white,
    autoscale: false,
    title: 'Price',
  })

  const quantilesSeriesList = createQuantilesLineSeries(chart, left)

  const mvrvSeries = left
    ? createLineSeries({
        chart,
        color: colors.white,
        options: {
          priceScaleId: 'left',
        },
      })
    : undefined

  datasetResource?.fetch()

  createEffect(() => {
    const dataset = datasetResource?.values() || _dataset || []

    series.setData(
      dataset.map((data) => ({
        ...data,
      })),
    )

    setQuantilesDatasets(quantilesSeriesList, dataset, candlesticks, mvrvSeries)
  })
}
