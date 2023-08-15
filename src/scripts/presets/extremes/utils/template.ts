import { createLineSeries } from '/src/scripts/chart'
import { colors } from '/src/scripts/utils'

type RecordQuantile<T> = Record<
  Extract<QuantileKey, 0.1 | 0.5 | 1 | 2.5 | 97.5 | 99 | 99.5 | 99.9>,
  T
>

export const applyExtremesPreset = (
  chart: LightweightCharts.IChartApi,
  datasets: DatasetWithQuantiles[],
  extremesColors: RecordQuantile<string>,
  titlesPrefix?: string,
) => {
  const createObject = (title: string, color: string) => ({
    series: createLineSeries({
      chart,
      title: `${titlesPrefix || ''}${title}`,
      color: `${color}bb`,
    }),
    dataset: [] as LightweightCharts.SingleValueData[],
  })

  const mid = createObject('Mid', colors.white)

  const groups: RecordQuantile<ReturnType<typeof createObject>> = {
    99.9: createObject('Ceil 4', extremesColors[99.9]),
    99.5: createObject('Ceil 3', extremesColors[99.5]),
    99: createObject('Ceil 2', extremesColors[99]),
    97.5: createObject('Ceil 1', extremesColors[99]),
    2.5: createObject('Floor 1', extremesColors[1]),
    1: createObject('Floor 2', extremesColors[1]),
    0.5: createObject('Floor 3', extremesColors[0.5]),
    0.1: createObject('Floor 4', extremesColors[0.1]),
  }

  datasets.forEach((dataset) => dataset.fetch())

  createEffect(() => {
    if (datasets.some((dataset) => !dataset.quantiles[1]())) return

    const referenceQuantile = datasets[0].quantiles[50]()

    if (!referenceQuantile) return

    Object.entries(groups).forEach(([quantile, object]) => {
      const quantileValue = Number(quantile) as unknown as QuantileKey

      const comparator = quantileValue < 50 ? Math.max : Math.min

      const dataset = referenceQuantile.map(({ time }, index) => ({
        time,
        value: comparator(
          ...datasets.map(
            (dataset) =>
              dataset.quantiles[quantileValue]()?.[index].value || NaN,
          ),
        ),
      }))

      object.dataset = dataset

      object.series.setData(object.dataset)
    })

    mid.dataset = groups[1].dataset.map(({ time, value }, index) => ({
      time,
      value: (value + groups[99].dataset[index].value) / 2,
    }))

    mid.series.setData(mid.dataset)
  })
}
