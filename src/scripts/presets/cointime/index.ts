import { allCointimePricesPreset } from './all'
import { cointimePreset } from './cointime'
import { trueMeanPreset } from './trueMean'
import { vaultedPreset } from './vaulted'

export const cointimePresetsGroup = {
  name: 'Cointime',
  list: [
    allCointimePricesPreset,
    trueMeanPreset,
    cointimePreset,
    vaultedPreset,
  ],
}
