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

  const quantilesSeriesList = createQuantilesLineSeries(chart, {
    left,
    darken: true,
  })

  const mainSeries = createLineSeries(chart, {
    color,
    autoscaleInfoProvider: undefined,
  })

  createEffect(() => mainSeries.setData(dataset.values() || []))

  Object.entries(quantilesSeriesList).forEach(([quantileKey, quantileSeries]) =>
    createEffect(() =>
      quantileSeries.setData(
        dataset.quantiles[quantileKey as unknown as QuantileKey]() || [],
      ),
    ),
  )
}
