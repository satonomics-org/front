import { allEntitiesPreset } from './all'
import { crabsPreset } from './crabs'
import { fishPreset } from './fish'
import { humpbacksPreset } from './humpbacks'
import { planktonPreset } from './plankton'
import { sharksPreset } from './sharks'
import { shrimpsPreset } from './shrimps'
import { whalesPreset } from './whales'

export const entitiesPresetsGroup = {
  name: 'Entities',
  list: [
    allEntitiesPreset,
    planktonPreset,
    shrimpsPreset,
    crabsPreset,
    fishPreset,
    sharksPreset,
    whalesPreset,
    humpbacksPreset,
  ],
}
