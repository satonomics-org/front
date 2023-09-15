import { resetLeftPriceScale } from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    halved: true,
  })

  datasets.stablecoinsMarketCaps

  return {
    halved: true,
  }
}
