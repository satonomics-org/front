import { basicPresetsGroup } from './basic'
import { daysDestroyedPresetsGroup } from './daysDestroyed'
import { derivativesPresetsGroup } from './derivatives'
import { entitiesPresetsGroup } from './entities'
import { holdersPresetsGroup } from './holders'
import { marketPresetsGroup } from './market'
import { realizedPresetsGroup } from './realized'
import { unrealizedPresetsGroup } from './unrealized'

// Add:
// - Sats per dollar
//  - Priced in ounces of gold
// Miners
// - Dollars per hash

export const presetsGroups = [
  basicPresetsGroup,
  marketPresetsGroup,
  holdersPresetsGroup,
  entitiesPresetsGroup,
  daysDestroyedPresetsGroup,
  realizedPresetsGroup,
  unrealizedPresetsGroup,
  derivativesPresetsGroup,
]
