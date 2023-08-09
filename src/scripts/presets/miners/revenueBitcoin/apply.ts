import { applyMovingAveragesPreset } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyMovingAveragesPreset({
    chart,
    dataset: datasets.minersRevenue,
    gradient: 'red',
    log: true,
  })
}
