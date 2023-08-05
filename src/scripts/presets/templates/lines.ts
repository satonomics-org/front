import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyDifferentLinesPreset = (params: {
  chart: LightweightCharts.IChartApi
  list: {
    dataset: DatasetResource
    color: string
    title: string
  }[]
}) => {
  const { chart, list } = params

  resetLeftPriceScale(chart)

  list.forEach(({ dataset, color, title }) => {
    const series = createLineSeries({
      chart,
      color: `${color}bb`,
      title,
    })

    dataset.fetch()

    createEffect(() => {
      series.setData(
        (dataset.values() || []).map((data) => ({
          ...data,
        }))
      )
    })
  })
}
