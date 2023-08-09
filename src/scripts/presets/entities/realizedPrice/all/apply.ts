import { applyDifferentLinesPreset, assignedColors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyDifferentLinesPreset({
    chart,
    list: [
      {
        datasetResource: datasets.realizedPrice,
        color: assignedColors.realized,
        title: 'Combined',
      },
      {
        datasetResource: datasets.humpbacksRealizedPrice,
        color: assignedColors.humpbacks,
        title: 'Humpbacks',
      },
      {
        datasetResource: datasets.whalesRealizedPrice,
        color: assignedColors.whales,
        title: 'Whales',
      },
      {
        datasetResource: datasets.sharksRealizedPrice,
        color: assignedColors.sharks,
        title: 'Sharks',
      },
      {
        datasetResource: datasets.fishRealizedPrice,
        color: assignedColors.fish,
        title: 'Fish',
      },
      {
        datasetResource: datasets.crabsRealizedPrice,
        color: assignedColors.crabs,
        title: 'Crabs',
      },
      {
        datasetResource: datasets.shrimpsRealizedPrice,
        color: assignedColors.shrimps,
        title: 'Shrimps',
      },
      {
        datasetResource: datasets.planktonRealizedPrice,
        color: assignedColors.plankton,
        title: 'Plankton',
      },
    ],
  })
}
