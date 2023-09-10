import { createQuantilesLineSeries } from '/src/scripts'

export const applyExtremesPreset = (
  chart: IChartApi,
  datasets: DatasetWithQuantiles[],
) => {
  const quantilesSeriesList = createQuantilesLineSeries(chart, {
    darkenPercentage: 0,
  })

  datasets.forEach((dataset) => dataset.fetch())

  createEffect(() => {
    if (datasets.some((dataset) => !dataset.quantiles[1]())) return

    const referenceQuantile = datasets[0].quantiles[1]()

    if (!referenceQuantile) return

    Object.entries(quantilesSeriesList).forEach(
      ([quantileKey, quantileSeries]) => {
        const quantileValue = Number(quantileKey) as unknown as QuantileKey

        const comparator = quantileValue < 50 ? Math.max : Math.min

        const dataset = referenceQuantile.map(({ time }, index) => ({
          time,
          value: comparator(
            ...datasets.map(
              (dataset) =>
                dataset.quantiles[quantileValue]()?.[index].value || NaN,
            ),
          ),
        }))

        quantileSeries.setData(dataset)
      },
    )
  })
}
