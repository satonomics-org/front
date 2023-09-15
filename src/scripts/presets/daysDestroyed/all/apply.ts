import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.terminalPrice,
        color: colors.terminalPrice,
        title: 'Terminal',
      },
      {
        dataset: datasets.cvdd,
        color: colors.cvdd,
        title: 'CVDD',
      },
      {
        dataset: datasets.balancedPrice,
        color: colors.balancedPrice,
        title: 'Balanced',
      },
      {
        dataset: datasets.realizedPrice,
        color: colors.realizedPrice,
        title: 'Realized',
      },
    ],
  })
