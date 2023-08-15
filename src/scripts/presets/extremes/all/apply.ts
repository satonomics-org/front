import { applyPreset as applyCyclePreset } from '../cycle/apply'
import { applyPreset as applyLocalPreset } from '../local/apply'

export const applyPreset: ApplyPreset = (params) => {
  applyCyclePreset({ ...params, titlesPrefix: 'Cycle ' })
  applyLocalPreset({ ...params, titlesPrefix: 'Local ' })
}
