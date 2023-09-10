import {
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
} from '/src/scripts'

export const addAverages = <Value extends WhitespaceData = SingleValueData>(
  dataset: Dataset<Value>,
): Dataset<Value> & AveragesAddOn => {
  const averagesSignals: AveragesSignals = {
    weekly: createSignal<SingleValueData[] | null>(null),
    monthly: createSignal<SingleValueData[] | null>(null),
    yearly: createSignal<SingleValueData[] | null>(null),
  }

  createEffect(
    on(
      () => dataset.values()?.length,
      (current, previous) => {
        if (current === previous) return

        const _dataset = dataset.values()

        if (!_dataset) return

        computeAverages(averagesSignals, _dataset)
      },
    ),
  )

  return {
    ...dataset,
    averages: {
      weekly: averagesSignals.weekly[0],
      monthly: averagesSignals.monthly[0],
      yearly: averagesSignals.yearly[0],
    },
  }
}

export const computeAverages = <Value extends WhitespaceData = SingleValueData>(
  averages: AveragesSignals,
  dataset: Value[],
) => {
  console.log('MAs: computing...')

  averages.weekly[1](computeWeeklyMovingAverage(dataset))
  averages.monthly[1](computeMonthlyMovingAverage(dataset))
  averages.yearly[1](computeYearlyMovingAverage(dataset))
}
