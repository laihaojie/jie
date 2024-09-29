import type { Preset } from 'unocss'
import type { PresetUnitOptions } from './unit'
import { commonRules } from '../rules'
import { commonShortcuts } from '../shortcuts'
import { commonTransformers } from '../transformers'
import { presetUnit } from './unit'

export interface PresetUniappOptions extends PresetUnitOptions {

}

export function presetUniapp(options: PresetUniappOptions = {}): Preset {
  const {
    unit = 'rpx',
    re = /(-?[.\d]+)rpx/g,
  } = options
  return {
    name: '@djie/unocss-preset-uniapp',
    presets: [
      ...options.unit ? [presetUnit({ unit, re })] : [],
    ],
    shortcuts: [
      ...commonShortcuts,
    ],
    rules: [
      ...commonRules,
    ],
    transformers: [
      ...commonTransformers,
    ],
  }
}
