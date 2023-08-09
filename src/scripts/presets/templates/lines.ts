import { createLineSeries, resetLeftPriceScale } from '/src/scripts'

export const applyDifferentLinesPreset = (params: {
  chart: LightweightCharts.IChartApi
  list: {
    datasetResource?: DatasetResource
    dataset?: LightweightCharts.SingleValueData[]
    color: string
    title: string
  }[]
}) => {
  const { chart, list } = params

  resetLeftPriceScale(chart)

  list.forEach(({ datasetResource, dataset, color, title }) => {
    const series = createLineSeries({
      chart,
      color: `${color}bb`,
      title,
    })

    datasetResource?.fetch()

    createEffect(() => {
      series.setData(
        (datasetResource?.values() || dataset || []).map((data) => ({
          ...data,
        })),
      )
    })
  })
}
