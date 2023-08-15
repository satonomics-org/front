import { applyAveragesPreset } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyAveragesPreset({
    chart,
    dataset: datasets.hashrate,
    gradient: 'red',
    log: true,
  })
}
