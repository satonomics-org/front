export const USABLE_CANDLESTICKS_START_DATE = '2012-01-01'
const MEDIAN = 0.5

export const addQuantiles = (
  _dataset: Dataset,
  _candlesticks: Accessor<SingleValueData[]>,
) => {
  const createQuantileSignal = () =>
    createSignal<SingleValueData[] | null>(null)

  const quantilesSignals: QuantileSignals = {
    0.1: createQuantileSignal(),
    0.5: createQuantileSignal(),
    1: createQuantileSignal(),
    2.5: createQuantileSignal(),
    5: createQuantileSignal(),
    10: createQuantileSignal(),
    25: createQuantileSignal(),
    50: createQuantileSignal(),
    75: createQuantileSignal(),
    90: createQuantileSignal(),
    95: createQuantileSignal(),
    97.5: createQuantileSignal(),
    99: createQuantileSignal(),
    99.5: createQuantileSignal(),
    99.9: createQuantileSignal(),
  }

  createEffect(
    on(
      () => `${_dataset.values()?.length}${_candlesticks().length}`,
      (current, previous) => {
        if (current === previous) return

        const candlesticks = _candlesticks()
        const dataset = _dataset.values()

        if (!candlesticks || !dataset) return

        computeQuantiles(quantilesSignals, dataset, candlesticks)
      },
    ),
  )

  const extendedDataset: Dataset & QuantilesAddOn = {
    ..._dataset,
    quantiles: {
      0.1: quantilesSignals[0.1][0],
      0.5: quantilesSignals[0.5][0],
      1: quantilesSignals[1][0],
      2.5: quantilesSignals[2.5][0],
      5: quantilesSignals[5][0],
      10: quantilesSignals[10][0],
      25: quantilesSignals[25][0],
      50: quantilesSignals[50][0],
      75: quantilesSignals[75][0],
      90: quantilesSignals[90][0],
      95: quantilesSignals[95][0],
      97.5: quantilesSignals[97.5][0],
      99: quantilesSignals[99][0],
      99.5: quantilesSignals[99.5][0],
      99.9: quantilesSignals[99.9][0],
    },
  }

  return extendedDataset
}

export const computeQuantiles = (
  quantiles: QuantileSignals,
  dataset: SingleValueData[],
  candlesticksCloses: SingleValueData[],
) => {
  console.log('quantiles: computing...')

  const firstIndexWithData =
    candlesticksCloses.findIndex(
      (candlestick) => candlestick.time === dataset[0].time,
    ) || 0

  const indexAtFirstUsableDate =
    candlesticksCloses.findIndex(
      (candlestick) => candlestick.time === USABLE_CANDLESTICKS_START_DATE,
    ) || 0

  const firstCandlestickIndex = Math.max(
    firstIndexWithData,
    indexAtFirstUsableDate,
  )

  const usableCandlesticks = (candlesticksCloses || []).slice(
    firstCandlestickIndex,
    dataset.length + firstIndexWithData,
  )

  const datasetIndexOffset = firstCandlestickIndex - firstIndexWithData

  if (datasetIndexOffset > dataset.length - 1) {
    return
  }

  let sorted: number[] = []

  computeMVRV(usableCandlesticks, dataset, datasetIndexOffset).forEach(
    ({ time, value: mvrvValue }, dataIndex) => {
      sortedInsert(sorted, mvrvValue)

      const length = dataIndex + 1

      Object.entries(quantiles).forEach(([key, signal]) => {
        const quantileValue = Number(key) / 100

        let value: number

        if (quantileValue !== MEDIAN || length % 2 !== 0) {
          const sortedIndex = Math.floor(length * quantileValue)

          value = sorted[sortedIndex]
        } else {
          const mid = Math.floor(length / 2)

          value = (sorted[mid - 1] + sorted[mid]) / 2
        }

        const data = {
          time,
          value: value * dataset[dataIndex + datasetIndexOffset].value,
        }

        signal[1]((l) => {
          l = l || []
          l.push(data)
          return l
        })
      })
    },
  )
}

const computeMVRV = (
  candlesticks: SingleValueData[],
  dataset: SingleValueData[],
  offset: number,
) => {
  const mvrv = candlesticks.map(({ time, value: close }, index) => {
    const data = dataset[index + offset]

    if (time !== data.time)
      throw Error(`Unsynced data (${time} vs ${data.time})`)

    return {
      time: data.time,
      value: close / data.value,
    }
  })

  return mvrv
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
