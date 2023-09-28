import { generateApplyPreset } from './apply'
import description from './description.md?raw'

export const krakenBitcoinVolumePreset = {
  id: 'marketBitcoinVolume',
  title: 'Bitcoin Volume',
  applyPreset: generateApplyPreset('volumeInBitcoin'),
  description,
}

export const krakenDollarVolumePreset = {
  id: 'marketDollarVolume',
  title: 'Dollars Volume',
  applyPreset: generateApplyPreset('volumeInDollars'),
  description,
}
