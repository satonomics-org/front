import { createLazyMemo } from '@solid-primitives/memo'

import {
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
} from '/src/scripts'

export const addAverages = <
  T extends DatedWhitespaceData = DatedSingleValueData,
>(
  dataset: Dataset<T[]>,
): Dataset<T[]> & AveragesAddOn => ({
  ...dataset,
  averages: {
    weekly: createLazyMemo(() => computeWeeklyMovingAverage(dataset.values())),
    monthly: createLazyMemo(() =>
      computeMonthlyMovingAverage(dataset.values()),
    ),
    yearly: createLazyMemo(() => computeYearlyMovingAverage(dataset.values())),
  },
})
