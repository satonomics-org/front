import { hashPricePreset } from './hashPrice'
import { hashRatePreset } from './hashRate'
import { puellMultiplePreset } from './puell'
import { minersRevenueBitcoinPreset } from './revenueBitcoin'
import { minersRevenueDollarsPreset } from './revenueDollars'

export const minersPresetsGroup = {
  name: 'Miners',
  list: [
    hashRatePreset,
    minersRevenueBitcoinPreset,
    minersRevenueDollarsPreset,
    puellMultiplePreset,
    hashPricePreset,
  ],
}
