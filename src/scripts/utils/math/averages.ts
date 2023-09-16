export const computeAverage = (values: number[]) =>
  values.reduce((total, currentValue) => total + currentValue, 0) /
  values.length

export const computeMovingAverage = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: T[] | null,
  interval: number,
): DatedSingleValueData[] => {
  if (!dataset?.length) return []

  console.log(`${interval}D MA: computing...`)

  return dataset.map((data, index) => ({
    date: data.date,
    time: data.time,
    value: computeAverage([
      ...(index + 1 < interval ? new Array(interval - index - 1).fill(0) : []),
      ...dataset
        .slice(Math.max(index - interval + 1, 0), index + 1)
        .map((data: any) => data.value || data.close || 1),
    ]),
  }))
}

export const computeWeeklyMovingAverage = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: T[] | null,
) => computeMovingAverage(dataset, 7)

export const computeMonthlyMovingAverage = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: T[] | null,
) => computeMovingAverage(dataset, 30)

export const computeYearlyMovingAverage = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: T[] | null,
) => computeMovingAverage(dataset, 365)
