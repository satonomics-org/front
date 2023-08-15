import { entitiesAccumulationPreset } from './accumulation'
import { entitiesBalancesPreset } from './balances'
import { entitiesDistributionPreset } from './distribution'
import { realizedPricePresets } from './realizedPrice'

export const entitiesPresetsGroup = {
  name: 'Entities',
  list: [
    entitiesDistributionPreset,
    entitiesBalancesPreset,
    entitiesAccumulationPreset,
    ...realizedPricePresets,
  ],
}
