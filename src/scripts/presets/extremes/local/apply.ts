import { applyExtremesPreset } from '../utils'

export const applyPreset: ApplyPreset = ({ chart, datasets }) =>
  applyExtremesPreset(chart, datasets, 'localExtremes')
