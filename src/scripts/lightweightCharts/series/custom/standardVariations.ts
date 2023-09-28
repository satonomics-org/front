import { computeAverage, createLineSeries, darken } from '/src/scripts'

export const createStandardVariationsLineSeries = (
  chart: IChartApi,
  color: string,
) => {
  color = darken(color)

  return [
    {
      series: createLineSeries(chart, {
        color,
        title: '0σ',
      }),
      multiplier: 0,
    },
    {
      series: createLineSeries(chart, {
        color,
        title: '1σ',
      }),
      multiplier: 1,
    },
    {
      series: createLineSeries(chart, {
        color,
        title: '2σ',
      }),
      multiplier: 2,
    },
    {
      series: createLineSeries(chart, {
        color,
        title: '3σ',
      }),
      multiplier: 3,
    },
    {
      series: createLineSeries(chart, {
        color,
        title: '-1σ',
      }),
      multiplier: -1,
    },
    {
      series: createLineSeries(chart, {
        color,
        title: '-2σ',
      }),
      multiplier: -2,
    },
  ]
}

export const setStandardVariationsDatasets = (
  standardVariationsList: ReturnType<typeof createStandardVariationsLineSeries>,
  dataset: DatedSingleValueData[],
  candlesticks: FullCandlestick[] | undefined,
) => {
  const start =
    candlesticks?.findIndex(
      (candlestick) => candlestick.date === dataset.at(0)?.date,
    ) || 0

  const mvrv = (candlesticks || [])
    .slice(start, dataset.length + start)
    .map(({ date, time, close }, index) => {
      if (date !== dataset[index].date)
        throw Error(`Unsynced data (${date} vs ${dataset[index].date})`)

      return {
        date,
        time,
        value: close / dataset[index].value,
      }
    })

  const { means, standardVariations } = computeStandardDeviation(mvrv)

  standardVariationsList.forEach(({ series, multiplier }) => {
    series.setData(
      dataset.map(({ value, time, date }, index) => ({
        time,
        date,
        value:
          value *
          (means[index].value + multiplier * standardVariations[index].value),
      })),
    )
  })
}

const computeStandardDeviation = (dataset: DatedSingleValueData[]) => {
  const means: DatedSingleValueData[] = []

  const standardVariations = dataset.map(
    (data, index): DatedSingleValueData => {
      let mean = 0

      if (means.length) {
        mean =
          ((means.at(-1)?.value || 1) * means.length + data.value) /
          (means.length + 1)
      } else {
        mean = data.value
      }

      means.push({
        date: data.date,
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
        date: data.date,
        time: data.time,
        value: Math.sqrt(variance),
      }
    },
  )

  return {
    means,
    standardVariations,
  }
}
