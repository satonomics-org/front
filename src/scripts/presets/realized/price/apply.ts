import { applyQuantilesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyQuantilesPreset({
    chart,
    color: colors.realizedPrice,
    dataset: datasets.realizedPrice,
  })
}
