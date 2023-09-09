import { krakenBitcoinVolumePreset, krakenDollarVolumePreset } from './volume'

export const marketPresetsGroup = {
  name: 'Market',
  list: [krakenBitcoinVolumePreset, krakenDollarVolumePreset],
}
