import { applyQuantilesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyQuantilesPreset({
    chart,
    color: colors.yearlyMA,
    dataset: datasets.yearlyMA,
  })
}
