import { applyQuantilesPreset, assignedColors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyQuantilesPreset({
    chart,
    dataset: datasets.crabsRealizedPrice,
    color: assignedColors.crabs,
  })
}
