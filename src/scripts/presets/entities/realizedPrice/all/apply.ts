import { applyDifferentLinesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.realizedPrice,
        color: colors.realized,
        title: 'Combined',
      },
      {
        dataset: datasets.humpbacksRealizedPrice,
        color: colors.humpbacks,
        title: 'Humpbacks',
      },
      {
        dataset: datasets.whalesRealizedPrice,
        color: colors.whales,
        title: 'Whales',
      },
      {
        dataset: datasets.sharksRealizedPrice,
        color: colors.sharks,
        title: 'Sharks',
      },
      {
        dataset: datasets.fishRealizedPrice,
        color: colors.fish,
        title: 'Fish',
      },
      {
        dataset: datasets.crabsRealizedPrice,
        color: colors.crabs,
        title: 'Crabs',
      },
      {
        dataset: datasets.shrimpsRealizedPrice,
        color: colors.shrimps,
        title: 'Shrimps',
      },
      {
        dataset: datasets.planktonRealizedPrice,
        color: colors.plankton,
        title: 'Plankton',
      },
    ],
  })
}
