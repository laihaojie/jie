import type { Preset } from '@unocss/core'
import { commonShortcuts } from '../shortcuts'
import { commonRules } from '../rules'
import type { PresetUnitOptions } from './unit'
import { presetUnit } from './unit'

export interface PresetUniappOptions extends PresetUnitOptions {

}

export function presetUniapp(options: PresetUniappOptions = {}): Preset {
  return {
    name: '@djie/unocss-preset-uniapp',
    presets: [
      ...options.unit ? [presetUnit(options) as Preset] : [],
    ],
    shortcuts: [
      ...commonShortcuts,
    ],
    rules: [
      ...commonRules,
    ],
  }
}
