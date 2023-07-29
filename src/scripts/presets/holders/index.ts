import { upTo2YearPreset } from './2y'
import { allHoldersPreset } from './all'
import { lthPreset } from './lth'
import { sthPreset } from './sth'

export const holdersPresetsGroup = {
  name: 'Holders',
  list: [allHoldersPreset, sthPreset, lthPreset, upTo2YearPreset],
}
