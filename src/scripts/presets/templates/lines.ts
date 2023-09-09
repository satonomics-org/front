import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyDifferentLinesPreset = (params: {
  chart: IChartApi
  list: {
    dataset?: Dataset
    values?: Accessor<SingleValueData[] | null>
    color: string
    title: string
  }[]
}) => {
  const { chart, list } = params

  resetLeftPriceScale(chart)

  list.forEach(({ dataset, values, color, title }) => {
    const series = createLineSeries(chart, { color, title })

    dataset?.fetch()

    createEffect(() => {
      series.setData(
        (dataset?.values() || values?.() || []).map((data) => ({
          ...data,
        })),
      )
    })
  })
}
