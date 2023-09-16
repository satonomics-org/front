import { generateApplyPreset } from './apply'
import description from './description.md?raw'

export const krakenBitcoinVolumePreset = {
  id: 'krakenBitcoinVolume',
  title: 'Kraken Bitcoin Volume',
  applyPreset: generateApplyPreset('volumeInBitcoin'),
  description,
}

export const krakenDollarVolumePreset = {
  id: 'krakenDollarVolume',
  title: 'Kraken Dollars Volume',
  applyPreset: generateApplyPreset('volumeInDollars'),
  description,
}
