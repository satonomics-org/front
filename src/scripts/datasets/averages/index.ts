import {
  computeMonthlyMovingAverage,
  computeWeeklyMovingAverage,
  computeYearlyMovingAverage,
} from '/src/scripts'

type SingleValueData = LightweightCharts.SingleValueData

export const addAverages = <
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
>(
  _dataset: Dataset<Value>,
): Dataset<Value> & AveragesAddOn => {
  const averagesSignals: AveragesSignals = {
    weekly: createSignal<SingleValueData[] | null>(null),
    monthly: createSignal<SingleValueData[] | null>(null),
    yearly: createSignal<SingleValueData[] | null>(null),
  }

  createEffect(
    on(
      () => _dataset.values()?.length,
      (current, previous) => {
        if (current === previous) return

        const dataset = _dataset.values()

        if (!dataset) return

        computeAverages(averagesSignals, dataset)
      },
    ),
  )

  return {
    ..._dataset,
    averages: {
      weekly: averagesSignals.weekly[0],
      monthly: averagesSignals.monthly[0],
      yearly: averagesSignals.yearly[0],
    },
  }
}

export const computeAverages = <
  Value extends
    LightweightCharts.WhitespaceData = LightweightCharts.SingleValueData,
>(
  averages: AveragesSignals,
  dataset: Value[],
) => {
  console.log('MAs: computing...')

  averages.weekly[1](computeWeeklyMovingAverage(dataset))
  averages.monthly[1](computeMonthlyMovingAverage(dataset))
  averages.yearly[1](computeYearlyMovingAverage(dataset))
}
