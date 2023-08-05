import { puellMultiplePreset } from './puell'
import { minersRevenueBitcoinPreset } from './revenueBitcoin'
import { minersRevenueDollarsPreset } from './revenueDollars'

export const minersPresetsGroup = {
  name: 'Miners',
  list: [
    minersRevenueBitcoinPreset,
    minersRevenueDollarsPreset,
    puellMultiplePreset,
  ],
}
