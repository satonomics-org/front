type ApplyPreset = (params: {
  chart: IChartApi
  datasets: Datasets
  titlesPrefix?: string
}) => PriceSeriesOptions | void

type PresetsGroup = {
  name: string
  list: {
    id: string
    title: string
    applyPreset?: ApplyPreset
    description: string
  }[]
}
