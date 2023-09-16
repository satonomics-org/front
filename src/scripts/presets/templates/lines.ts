import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyDifferentLinesPreset = ({
  chart,
  list,
}: {
  chart: IChartApi
  list: {
    dataset?: Dataset
    values?: Accessor<DatedSingleValueData[] | null>
    color: string
    title: string
  }[]
}) => {
  resetLeftPriceScale(chart)

  list.forEach(({ dataset, values, color, title }) => {
    const series = createLineSeries(chart, {
      color,
      title,
      autoscaleInfoProvider: undefined,
    })

    createEffect(() => series.setData(dataset?.values() || values?.() || []))
  })
}
