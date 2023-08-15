export const computeAverage = (values: number[]) =>
  values.reduce((total, currentValue) => total + currentValue, 0) /
  values.length

export const computeMovingAverage = <
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
>(
  dataset: Value[],
  interval: number,
): LightweightCharts.SingleValueData[] =>
  dataset.map((data, index) => ({
    time: data.time,
    value: computeAverage([
      ...(index + 1 < interval ? new Array(interval - index - 1).fill(0) : []),
      ...dataset
        .slice(Math.max(index - interval + 1, 0), index + 1)
        .map((data: any) => data.value || data.close || 1),
    ]),
  }))

export const computeWeeklyMovingAverage = <
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
>(
  dataset: Value[],
) => computeMovingAverage(dataset, 7)

export const computeMonthlyMovingAverage = <
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
>(
  dataset: Value[],
) => computeMovingAverage(dataset, 30)

export const computeYearlyMovingAverage = <
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
>(
  dataset: Value[],
) => computeMovingAverage(dataset, 365)
