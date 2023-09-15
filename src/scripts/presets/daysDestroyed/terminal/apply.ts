import { applyQuantilesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyQuantilesPreset({
    chart,
    dataset: datasets.terminalPrice,
    color: colors.terminalPrice,
  })
