import { applyDifferentLinesPreset, assignedColors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        dataset: datasets.realizedPrice,
        color: assignedColors.realized,
        title: 'Combined',
      },
      {
        dataset: datasets.humpbacksRealizedPrice,
        color: assignedColors.humpbacks,
        title: 'Humpbacks',
      },
      {
        dataset: datasets.whalesRealizedPrice,
        color: assignedColors.whales,
        title: 'Whales',
      },
      {
        dataset: datasets.sharksRealizedPrice,
        color: assignedColors.sharks,
        title: 'Sharks',
      },
      {
        dataset: datasets.fishRealizedPrice,
        color: assignedColors.fish,
        title: 'Fish',
      },
      {
        dataset: datasets.crabsRealizedPrice,
        color: assignedColors.crabs,
        title: 'Crabs',
      },
      {
        dataset: datasets.shrimpsRealizedPrice,
        color: assignedColors.shrimps,
        title: 'Shrimps',
      },
      {
        dataset: datasets.planktonRealizedPrice,
        color: assignedColors.plankton,
        title: 'Plankton',
      },
    ],
  })
}
