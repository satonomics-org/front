export const computeAverage = (values: number[]) =>
  values.reduce((total, currentValue) => total + currentValue, 0) /
  values.length

type Dataset = LightweightCharts.SingleValueData[]

export const computeMovingAverage = (
  dataset: Dataset,
  interval: number,
): Dataset =>
  dataset.map((data, index) => ({
    ...data,
    value: computeAverage([
      ...(index + 1 < interval ? new Array(interval - index - 1).fill(0) : []),
      ...dataset
        .slice(Math.max(index - interval + 1, 0), index + 1)
        .map((data) => data.value),
    ]),
  }))

export const computeWeeklyMovingAverage = (dataset: Dataset) =>
  computeMovingAverage(dataset, 7)

export const computeMonthlyMovingAverage = (dataset: Dataset) =>
  computeMovingAverage(dataset, 30)

export const computeYearlyMovingAverage = (dataset: Dataset) =>
  computeMovingAverage(dataset, 365)
