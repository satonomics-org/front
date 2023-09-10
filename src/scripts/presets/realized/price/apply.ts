import { getOwner } from 'solid-js'

import { applyQuantilesPreset, colors } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  console.log(getOwner())

  applyQuantilesPreset({
    chart,
    color: colors.realizedPrice,
    dataset: datasets.realizedPrice,
  })
}
