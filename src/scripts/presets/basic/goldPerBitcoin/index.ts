import { applyPreset } from './apply'
import description from './description.md?raw'

export const goldPerBitcoinPreset = {
  id: 'goldPerBitcoin',
  title: 'Gold (oz) per Bitcoin',
  applyPreset,
  description,
}
