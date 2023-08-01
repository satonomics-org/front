export const average = (values: number[]) =>
  values.reduce((total, currentValue) => total + currentValue, 0) /
  values.length

type Dataset = LightweightCharts.SingleValueData[]

export const movingAverage = (dataset: Dataset, interval: number) =>
  dataset.map((data, index) => ({
    ...data,
    value:
      index + 1 < interval
        ? 0
        : average(
            dataset
              .slice(index - interval + 1, index + 1)
              .map((data) => data.value)
          ),
  }))

export const weeklyMovingAverage = (dataset: Dataset) =>
  movingAverage(dataset, 7)

export const monthlyMovingAverage = (dataset: Dataset) =>
  movingAverage(dataset, 30)

export const yearlyMovingAverage = (dataset: Dataset) =>
  movingAverage(dataset, 365)
