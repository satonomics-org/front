import { applyAveragesPreset } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  applyAveragesPreset({
    chart,
    dataset: datasets.minersRevenueInBitcoin,
    gradient: 'red',
    log: true,
  })
}
