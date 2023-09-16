import { createQuantilesLineSeries } from '/src/scripts'

export const applyExtremesPreset = (
  chart: IChartApi,
  datasets: Datasets,
  key: KeysOfValue<Datasets, ExtremesDataset>,
) => {
  const quantilesSeriesList = createQuantilesLineSeries(chart, {
    autoscaleInfoProvider: undefined,
  })

  Object.entries(quantilesSeriesList).forEach(
    ([quantileKey, quantileSeries]) => {
      createEffect(() =>
        quantileSeries.setData(
          datasets[key][quantileKey as unknown as ExtremeQuantileKey]() || [],
        ),
      )
    },
  )
}
