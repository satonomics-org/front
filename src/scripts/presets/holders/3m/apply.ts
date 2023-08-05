import { applyQuantilesPreset, assignedColors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets, candlesticks }) => {
  applyQuantilesPreset({
    chart,
    datasetResource: datasets.threeMonthsRealizedPrice,
    color: assignedColors.twoYears,
    candlesticks,
  })
}
