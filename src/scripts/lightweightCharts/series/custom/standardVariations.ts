import { computeAverage, createLineSeries, darken } from '/src/scripts'

export const createStandardVariationsLineSeries = (
  chart: IChartApi,
  color: string,
) => {
  return [
    {
      series: createLineSeries(chart, {
        color: darken(color),
        title: '0σ',
      }),
      multiplier: 0,
    },
    {
      series: createLineSeries(chart, {
        color: darken(color),
        title: '1σ',
      }),
      multiplier: 1,
    },
    {
      series: createLineSeries(chart, {
        color: darken(color),
        title: '2σ',
      }),
      multiplier: 2,
    },
    {
      series: createLineSeries(chart, {
        color: darken(color),
        title: '3σ',
      }),
      multiplier: 3,
    },
    {
      series: createLineSeries(chart, {
        color: darken(color),
        title: '-1σ',
      }),
      multiplier: -1,
    },
    {
      series: createLineSeries(chart, {
        color: darken(color),
        title: '-2σ',
      }),
      multiplier: -2,
    },
  ]
}

export const setStandardVariationsDatasets = (
  standardVariationsList: ReturnType<typeof createStandardVariationsLineSeries>,
  dataset: SingleValueData[],
  candlesticks: CandlestickDataWithVolume[] | undefined,
) => {
  const start =
    candlesticks?.findIndex(
      (candlestick) => candlestick.time === dataset.at(0)?.time,
    ) || 0

  const mvrv = (candlesticks || [])
    .slice(start, dataset.length + start)
    .map(({ time, close }, index) => {
      if (time !== dataset[index].time)
        throw Error(`Unsynced data (${time} vs ${dataset[index].time})`)

      return {
        time,
        value: close / dataset[index].value,
      }
    })

  const { means, standardVariations } = computeStandardDeviation(mvrv)

  standardVariationsList.forEach(({ series, multiplier }) => {
    series.setData(
      dataset.map(({ value, time }, index) => ({
        time,
        value:
          value *
          (means[index].value + multiplier * standardVariations[index].value),
      })),
    )
  })
}

const computeStandardDeviation = (dataset: SingleValueData[]) => {
  const means: SingleValueData[] = []

  const standardVariations = dataset.map((data, index): SingleValueData => {
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

    const variance = computeAverage(
      dataset.slice(0, index + 1).map((data) => {
        const deviation = data.value - mean
        return deviation ** 2
      }),
    )

    return {
      time: data.time,
      value: Math.sqrt(variance),
    }
  })

  return {
    means,
    standardVariations,
  }
}
