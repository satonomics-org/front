import { applyQuantilesPreset, assignedColors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets, candlesticks }) => {
  applyQuantilesPreset({
    chart,
    datasetResource: datasets.oneYearRealizedPrice,
    color: assignedColors.oneYear,
    candlesticks,
  })
}