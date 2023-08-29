import {
  entities30DAccumulationPreset,
  entities90DAccumulationPreset,
} from './accumulation'
import { entitiesBalancesPreset } from './balances'
import { entitiesDistributionPreset } from './distribution'
import { realizedPricePresets } from './realizedPrice'

export const entitiesPresetsGroup = {
  name: 'Entities',
  list: [
    entitiesDistributionPreset,
    entitiesBalancesPreset,
    entities30DAccumulationPreset,
    entities90DAccumulationPreset,
    ...realizedPricePresets,
  ],
}
