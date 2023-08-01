import { basicPresetsGroup } from './basic'
import { daysDestroyedPresetsGroup } from './daysDestroyed'
import { derivativesPresetsGroup } from './derivatives'
import { entitiesPresetsGroup } from './entities'
import { holdersPresetsGroup } from './holders'
import { marketPresetsGroup } from './market'
import { minersPresetsGroup } from './miners'
import { realizedPresetsGroup } from './realized'
import { supplyPresetsGroup } from './supply'

// Add:
// - Sats per dollar
//  - Priced in ounces of gold (https://data.nasdaq.com/data/LBMA/GOLD-gold-price-london-fixing)
// https://www.longtermtrends.net/
// Miners
// - Dollars per hash

export const presetsGroups = [
  basicPresetsGroup,
  marketPresetsGroup,
  realizedPresetsGroup,
  holdersPresetsGroup,
  entitiesPresetsGroup,
  daysDestroyedPresetsGroup,
  minersPresetsGroup,
  supplyPresetsGroup,
  derivativesPresetsGroup,
]