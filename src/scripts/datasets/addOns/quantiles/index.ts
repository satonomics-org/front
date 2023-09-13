import { createLazyMemo } from '@solid-primitives/memo'

const MEDIAN = 0.5

export const addQuantiles = (
  dataset: Dataset & RatiosAddOn,
): typeof dataset & QuantilesAddOn => ({
  ...dataset,
  quantiles: {
    0.1: createLazyMemo(() => computeQuantile(dataset, 0.1)),
    0.5: createLazyMemo(() => computeQuantile(dataset, 0.5)),
    1: createLazyMemo(() => computeQuantile(dataset, 1)),
    2.5: createLazyMemo(() => computeQuantile(dataset, 2.5)),
    5: createLazyMemo(() => computeQuantile(dataset, 5)),
    10: createLazyMemo(() => computeQuantile(dataset, 10)),
    25: createLazyMemo(() => computeQuantile(dataset, 25)),
    50: createLazyMemo(() => computeQuantile(dataset, 50)),
    75: createLazyMemo(() => computeQuantile(dataset, 75)),
    90: createLazyMemo(() => computeQuantile(dataset, 90)),
    95: createLazyMemo(() => computeQuantile(dataset, 95)),
    97.5: createLazyMemo(() => computeQuantile(dataset, 97.5)),
    99: createLazyMemo(() => computeQuantile(dataset, 99)),
    99.5: createLazyMemo(() => computeQuantile(dataset, 99.5)),
    99.9: createLazyMemo(() => computeQuantile(dataset, 99.9)),
  },
})

export const computeQuantile = (
  dataset: Dataset & RatiosAddOn,
  quantile: number,
) => {
  console.log(`${quantile}% Q: computing...`)

  const {
    values,
    ratios: { values: ratios, offset },
  } = dataset

  let sortedRatios: number[] = []

  return ratios().map(({ time, value: ratio }, dataIndex) => {
    sortedInsert(sortedRatios, ratio)

    const length = dataIndex + 1

    const quantileValue = quantile / 100

    let value: number

    if (quantileValue !== MEDIAN || length % 2 !== 0) {
      const sortedIndex = Math.floor(length * quantileValue)

      value = sortedRatios[sortedIndex]
    } else {
      const mid = Math.floor(length / 2)

      value = (sortedRatios[mid - 1] + sortedRatios[mid]) / 2
    }

    return {
      time,
      value: value * (values()?.at(dataIndex + offset())?.value || 1),
    }
  })
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
