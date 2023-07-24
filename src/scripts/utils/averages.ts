export const average = (values: number[]) =>
  values.reduce((total, currentValue) => total + currentValue, 0) /
  values.length

export const movingAverage = (
  dataset: LightweightCharts.SingleValueData[],
  interval: number
) =>
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
