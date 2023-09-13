import { createLazyMemo } from '@solid-primitives/memo'

import {
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
} from '/src/scripts'

export const addAverages = <Value extends WhitespaceData = SingleValueData>(
  dataset: Dataset<Value>,
): Dataset<Value> & AveragesAddOn => ({
  ...dataset,
  averages: {
    weekly: createLazyMemo(() => computeWeeklyMovingAverage(dataset.values())),
    monthly: createLazyMemo(() =>
      computeMonthlyMovingAverage(dataset.values()),
    ),
    yearly: createLazyMemo(() => computeYearlyMovingAverage(dataset.values())),
  },
})
