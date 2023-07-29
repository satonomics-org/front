import { netRealizedPreset } from './net'
import { realizedPricePreset } from './price'
import { soprPreset } from './sopr'

export const realizedPresetsGroup = {
  name: 'Realized',
  list: [realizedPricePreset, netRealizedPreset, soprPreset],
}
