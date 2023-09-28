import { dollarsPerBitcoinPreset } from './dollarsPerBitcoin'
import { goldPerBitcoinPreset } from './goldPerBitcoin'
import { satsPerDollarPreset } from './satsPerDollar'

export const basicPresetsGroup = {
  name: 'Basic',
  list: [dollarsPerBitcoinPreset, satsPerDollarPreset, goldPerBitcoinPreset],
}
