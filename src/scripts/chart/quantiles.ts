import { colors, createLineSeries, roundValue } from '/src/scripts'

const USABLE_CANDLESTICKS_START_DATE = '2012-01-01'

export const createQuantilesLineSeries = (
  chart: LightweightCharts.IChartApi,
  color: string,
  left?: true
) =>
  [
    {
      value: 50,
      color: colors.emerald,
    },
    ...[
      {
        value: 25,
        color: colors.lime,
      },
      {
        value: 10,
        color: colors.yellow,
      },
      {
        value: 5,
        color: colors.orange,
      },
      {
        value: 2.5,
        color: colors.red,
      },
      {
        value: 1,
        color: colors.pink,
      },
      {
        value: 0.5,
        color: colors.fuchsia,
      },
      {
        value: 0.1,
        color: colors.violet,
      },
    ]
      .map((tuple) => [
        tuple,
        { ...tuple, value: roundValue(100 - tuple.value, 1) },
      ])
      .flat(),
  ].map(({ color, value }) => ({
    series: createLineSeries({
      chart,
      color: `${color}88`,
      title: `${Math.min(roundValue(100 - value, 1), value)}%`,
      options: {
        priceScaleId: left ? 'left' : undefined,
      },
    }),
    percentage: value,
  }))

export const setQuantilesDatasets = (
  quantilesList: ReturnType<typeof createQuantilesLineSeries>,
  dataset: LightweightCharts.SingleValueData[],
  candlesticks: CandlestickDataWithVolume[] | undefined,
  mvrvSeries?: LightweightCharts.ISeriesApi<'Line'>
  // meanSeries?: LightweightCharts.ISeriesApi<'Line'>
) => {
  const firstIndexWithData =
    candlesticks?.findIndex(
      (candlestick) => candlestick.time === dataset.at(0)?.time
    ) || 0

  const indexAtFirstUsableDate =
    candlesticks?.findIndex(
      (candlestick) => candlestick.time === USABLE_CANDLESTICKS_START_DATE
    ) || 0

  const firstCandlestickIndex = Math.max(
    firstIndexWithData,
    indexAtFirstUsableDate
  )

  const usableCandlesticks = (candlesticks || []).slice(
    firstCandlestickIndex,
    dataset.length + firstIndexWithData
  )

  const datasetIndexOffset = firstCandlestickIndex - firstIndexWithData

  if (datasetIndexOffset > dataset.length - 1) {
    return
  }

  const mvrv = computeMVRV(
    usableCandlesticks,
    dataset,
    datasetIndexOffset,
    mvrvSeries
  )

  // const means = computeMean(mvrv)

  // if (meanSeries) {
  //   meanSeries.setData(means)
  // }

  const quantilesDatasets = computeQuantiles({
    mvrv,
    quantilesList: quantilesList.map((q) => q.percentage),
    // means,
  })

  quantilesList.forEach(({ series, percentage }, quantilesIndex) => {
    series.setData(
      dataset.slice(datasetIndexOffset).map(({ value, time }, dataIndex) => {
        const quantileValue = quantilesDatasets[quantilesIndex][dataIndex]

        if (time !== quantileValue.time)
          throw Error(`Unsynced data (${time} vs ${quantileValue.time})`)

        return {
          time,
          value:
            (mvrvSeries ? 1 : value) *
            // means[dataIndex].value *
            quantileValue.value,
        }
      })
    )
  })
}

const MEDIAN = 0.5

const computeQuantiles = (params: {
  mvrv: LightweightCharts.SingleValueData[]
  quantilesList: number[]
  // means: LightweightCharts.SingleValueData[]
}) => {
  const { mvrv, quantilesList } = params

  let sorted: number[] = []

  const quantiles: LightweightCharts.SingleValueData[][] = new Array(
    quantilesList.length
  )
    .fill(0)
    .map(() => [])

  mvrv.forEach((data, dataIndex) => {
    const insertValue = data.value
    // const insertValue = data.value / means[dataIndex].value

    sortedInsert(sorted, insertValue)

    const currentDatasetLength = dataIndex + 1

    quantiles.forEach((quantileArray, quantileIndex) => {
      const quantileValue = quantilesList[quantileIndex] / 100

      let value: number

      if (quantileValue !== MEDIAN || currentDatasetLength % 2 !== 0) {
        const sortedIndex = Math.floor(currentDatasetLength * quantileValue)

        value = sorted[sortedIndex]
      } else {
        const mid = Math.floor(currentDatasetLength / 2)

        value = (sorted[mid - 1] + sorted[mid]) / 2
      }

      quantileArray.push({ time: data.time, value })
    })
  })

  return quantiles
}

const computeMVRV = (
  candlesticks: CandlestickDataWithVolume[],
  dataset: LightweightCharts.SingleValueData[],
  offset: number,
  series?: LightweightCharts.ISeriesApi<'Line'>
) => {
  const mvrv = candlesticks.map(({ time, close }, index) => {
    const data = dataset[index + offset]

    if (time !== data.time)
      throw Error(`Unsynced data (${time} vs ${data.time})`)

    return {
      time: data.time,
      value: close / data.value,
    }
  })

  series?.setData(mvrv.map((data) => ({ ...data })))

  return mvrv
}

const computeMean = (dataset: LightweightCharts.SingleValueData[]) => {
  const means: LightweightCharts.SingleValueData[] = []

  dataset.forEach((data) => {
    let mean = 0

    if (means.length) {
      mean =
        ((means.at(-1)?.value || 1) * means.length + data.value) /
        (means.length + 1)
    } else {
      mean = data.value
    }

    means.push({
      time: data.time,
      value: mean,
    })
  })

  return means
}

const sortedInsert = (array: number[], value: number) => {
  let low = 0
  let high = array.length

  while (low < high) {
    const mid = (low + high) >>> 1

    if (array[mid] < value) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  array.splice(low, 0, value)
}
