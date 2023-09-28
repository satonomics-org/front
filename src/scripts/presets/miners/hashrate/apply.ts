import { applyAveragesPreset } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyAveragesPreset({
    chart,
    dataset: datasets.hashRate,
    gradient: 'red',
    log: true,
  })
