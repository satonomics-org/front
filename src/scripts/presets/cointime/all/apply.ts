import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.vaultedPrice,
        color: colors.vaultedPrice,
        title: 'Vaulted',
      },
      {
        dataset: datasets.cointimePrice,
        color: colors.cointimePrice,
        title: 'Cointime',
      },
      {
        dataset: datasets.trueMeanPrice,
        color: colors.trueMeanPrice,
        title: 'True Mean',
      },
      {
        dataset: datasets.realizedPrice,
        color: colors.realizedPrice,
        title: 'Realized',
      },
    ],
  })
