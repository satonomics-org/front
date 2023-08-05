import { oneMonthPreset } from './1m'
import { twoYearsPreset } from './2y'
import { threeMonthsPreset } from './3m'
import { allHoldersPreset } from './all'
import { lthPreset } from './lth'
import { sthPreset } from './sth'

export const holdersPresetsGroup = {
  name: 'Holders',
  list: [
    allHoldersPreset,
    oneMonthPreset,
    threeMonthsPreset,
    sthPreset,
    twoYearsPreset,
    lthPreset,
  ],
}
