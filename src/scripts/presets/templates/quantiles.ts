import {
  USABLE_CANDLESTICKS_START_DATE,
  colors,
  createLineSeries,
  createQuantilesLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyQuantilesPreset = (params: {
  chart: IChartApi
  dataset: DatasetWithQuantiles
  color?: string
  left?: true
}) => {
  const { chart, dataset, left } = params

  resetLeftPriceScale(chart, {
    visible: left,
  })

  const mainSeries = createLineSeries(chart, {
    color: colors.white,
    autoscaleInfoProvider: undefined,
    title: 'Price',
  })

  const quantilesSeriesList = createQuantilesLineSeries(chart, left)

  dataset?.fetch()

  createEffect(() => {
    const values = dataset?.values()

    if (!values || !dataset.quantiles[50]()?.at(0)) return

    mainSeries.setData(
      values.map((data) => ({
        ...data,
      })),
    )

    Object.entries(quantilesSeriesList).forEach(
      ([quantileKey, quantileSeries]) => {
        const offset = values.findIndex(
          (value) => value.time === USABLE_CANDLESTICKS_START_DATE,
        )

        quantileSeries.setData(
          values.slice(offset).map(({ time }, dataIndex) => {
            const quantileData =
              dataset.quantiles[quantileKey as unknown as QuantileKey]()?.[
                dataIndex
              ]

            if (time !== quantileData?.time)
              throw Error(`Unsynced data (${time} vs ${quantileData?.time})`)

            return {
              time,
              value: quantileData.value,
            }
          }),
        )
      },
    )
  })
}
