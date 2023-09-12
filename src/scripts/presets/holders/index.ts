import { applyPreset } from '../realized/price/apply'
import { oneMonthPreset } from './1m'
import { oneYearPreset } from './1y'
import { twoYearsPreset } from './2y'
import { threeMonthsPreset } from './3m'
import { sixMonthsPreset } from './6m'
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
    sixMonthsPreset,
    oneYearPreset,
    twoYearsPreset,
    {
      id: 'allHolderss',
      title: 'All Holders Realized Price',
      applyPreset,
      description: '',
    },
    lthPreset,
  ],
}
