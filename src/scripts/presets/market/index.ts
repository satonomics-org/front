import { stablecoinsMarketCapsPreset } from './stablecoins'
import { krakenBitcoinVolumePreset, krakenDollarVolumePreset } from './volume'

export const marketPresetsGroup = {
  name: 'Market',
  list: [
    krakenBitcoinVolumePreset,
    krakenDollarVolumePreset,
    // stablecoinsMarketCapsPreset,
  ],
}
