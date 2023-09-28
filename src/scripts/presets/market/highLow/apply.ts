import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.sthPriceHigh,
        color: colors.up,
      },
      {
        dataset: datasets.sthPriceLow,
        color: colors.down,
      },
    ],
  })
}
