import { applyPreset } from './apply'

import description from './description.md?raw'

export const fundingRatesPreset = {
  id: 'fundRates',
  title: 'Funding rates',
  applyPreset,
  description,
}
