import { applyAveragesPreset } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyAveragesPreset({
    chart,
    dataset: datasets.puellMultiple,
    gradient: 'violet',
    log: true,
  })
