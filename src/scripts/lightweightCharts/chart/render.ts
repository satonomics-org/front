import {
  applyPriceSeries,
  chartState,
  createChart,
  createLineSeries,
  presetsGroups,
  updateLastCandlestick,
  updateWhitespaceDataset,
} from '/src/scripts'

const whitespaceDataset: DatedWhitespaceData[] = []

let dispose: VoidFunction | undefined = undefined

export const renderChart = async (params: {
  candlesticks: CandlestickDataWithVolume[]
  id: string
  datasets: Datasets
  latestCandle: Accessor<CandlestickDataWithVolume | null>
}) => {
  untrack(() => {
    dispose?.()

    createRoot((_dispose) => {
      dispose = _dispose

      chartState.reset = () => {
        renderChart(params)
      }

      const { candlesticks, id, datasets } = params

      console.log(`preset: ${id}`)

      createChart()

      const { chart } = chartState

      if (!chart || !candlesticks.length) return

      try {
        const whitespaceSeries = createLineSeries(chart)

        updateWhitespaceDataset(whitespaceDataset)

        whitespaceSeries.setData(whitespaceDataset.map((data) => ({ ...data })))

        const options =
          presetsGroups
            .map((group) => group.list)
            .flat()
            .find((preset) => preset.id === id)
            ?.applyPreset?.({
              chart,
              datasets,
            }) || undefined

        applyPriceSeries(chart, candlesticks, options)

        updateLastCandlestick(params.latestCandle())
      } catch {}
    })
  })
}
