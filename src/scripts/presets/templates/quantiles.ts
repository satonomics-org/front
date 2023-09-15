import {
  createLineSeries,
  createQuantilesLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyQuantilesPreset = (params: {
  chart: IChartApi
  dataset: DatasetWithQuantiles
  color: string
  left?: true
}) => {
  const { chart, dataset, left, color } = params

  resetLeftPriceScale(chart, {
    visible: left,
  })

  const mainSeries = createLineSeries(chart, {
    color,
    autoscaleInfoProvider: undefined,
  })

  const quantilesSeriesList = createQuantilesLineSeries(chart, {
    left,
    darken: true,
  })

  dataset.fetch()

  createEffect(() => mainSeries.setData(dataset.values() || []))

  Object.entries(quantilesSeriesList).forEach(([quantileKey, quantileSeries]) =>
    createEffect(() =>
      quantileSeries.setData(
        dataset.quantiles[quantileKey as unknown as QuantileKey]() || [],
      ),
    ),
  )
}
