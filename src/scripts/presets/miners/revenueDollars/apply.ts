import { applyAveragesPreset } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyAveragesPreset({
    chart,
    dataset: datasets.minersRevenueInDollars,
    gradient: 'green',
    log: true,
  })
