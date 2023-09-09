import { averagesPresetsGroup } from './averages'
import { basicPresetsGroup } from './basic'
import { cointimePresetsGroup } from './cointime'
import { daysDestroyedPresetsGroup } from './daysDestroyed'
import { derivativesPresetsGroup } from './derivatives'
import { entitiesPresetsGroup } from './entities'
import { extremesGroup } from './extremes'
import { holdersPresetsGroup } from './holders'
import { marketPresetsGroup } from './market'
import { minersPresetsGroup } from './miners'
import { realizedPresetsGroup } from './realized'
import { supplyPresetsGroup } from './supply'

export * from './templates'

export const presetsGroups: PresetsGroup[] = [
  basicPresetsGroup,
  marketPresetsGroup,
  extremesGroup,
  averagesPresetsGroup,
  realizedPresetsGroup,
  holdersPresetsGroup,
  entitiesPresetsGroup,
  cointimePresetsGroup,
  daysDestroyedPresetsGroup,
  minersPresetsGroup,
  supplyPresetsGroup,
  derivativesPresetsGroup,
]
