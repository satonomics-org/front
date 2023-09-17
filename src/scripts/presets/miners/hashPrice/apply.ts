import { applyAveragesPreset } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyAveragesPreset({
    chart,
    dataset: datasets.hashPrice,
    gradient: 'red',
    log: true,
  })
