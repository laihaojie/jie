import type { Preset } from 'unocss'
import type { PresetUnitOptions } from './unit'
import { objectMerge } from '@djie/utils'
import { presetAttributify, presetUno } from 'unocss'
import { commonRules } from '../rules'
import { commonShortcuts } from '../shortcuts'
import { commonTransformers } from '../transformers'
import { presetUnit } from './unit'

export interface PresetUniappOptions extends PresetUnitOptions {
  optionsPresetUno?: Parameters<typeof presetUno>[0]
  optionsPresetAttributify?: Parameters<typeof presetAttributify>[0]

  disablePresetUno?: boolean
  disablePresetAttributify?: boolean
  disablePresetUnit?: boolean
}

export function presetUniapp(_options: PresetUniappOptions = {}): Preset {
  const options = objectMerge({
    unit: 'rpx',
    re: /(-?[.\d]+)rpx/g,
  } as PresetUniappOptions, _options) as PresetUniappOptions
  return {
    name: '@djie/unocss-preset-uniapp',
    presets: ([] as Preset[])
      .concat(!options.disablePresetUno ? presetUno(options.optionsPresetUno) : [])
      .concat(!options.disablePresetAttributify ? presetAttributify(options.optionsPresetAttributify) : [])
      .concat(options.unit ? presetUnit(options) : []),
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
