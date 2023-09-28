import { sthPriceHighLowPreset } from './highLow'
import { marketCapsPresets } from './marketCaps'
import { krakenBitcoinVolumePreset, krakenDollarVolumePreset } from './volume'

export const marketPresetsGroup = {
  name: 'Market',
  list: [
    krakenBitcoinVolumePreset,
    krakenDollarVolumePreset,
    sthPriceHighLowPreset,
    ...marketCapsPresets,
  ],
}
