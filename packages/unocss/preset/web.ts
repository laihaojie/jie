import type { Preset } from 'unocss'
import type { PresetUnitOptions } from './unit'
import { objectMerge } from '@djie/utils'
import { presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'
import { commonRules } from '../rules'
import { commonShortcuts } from '../shortcuts'
import { commonTransformers } from '../transformers'
import { presetUnit } from './unit'

export interface PresetWebOptions extends PresetUnitOptions {
  optionsPresetUno?: Parameters<typeof presetUno>[0]
  optionsPresetAttributify?: Parameters<typeof presetAttributify>[0]
  optionsPresetIcons?: Parameters<typeof presetIcons>[0]
  optionsPresetTypography?: Parameters<typeof presetTypography>[0]
  optionsPresetWebFonts?: Parameters<typeof presetWebFonts>[0]
}

export function presetWeb(options: PresetWebOptions = {}): Preset {
  return {
    name: '@djie/unocss-preset-web',
    presets: [
      presetUno(options.optionsPresetUno),
      presetAttributify(options.optionsPresetAttributify),
      presetIcons(objectMerge(options.optionsPresetIcons, {
        scale: 1.2,
        warn: true,
      })),
      presetTypography(options.optionsPresetTypography),
      presetWebFonts(objectMerge(options.optionsPresetWebFonts, {
        fonts: {
          sans: 'DM Sans',
          serif: 'DM Serif Display',
          mono: 'DM Mono',
        },
      })),
      ...options.unit ? [presetUnit(options)] : [],
    ],
    shortcuts: [
      ...commonShortcuts,
    ],
    rules: [
      ...commonRules,
    ],
    safelist: 'prose m-auto text-left'.split(' '),
    transformers: [
      ...commonTransformers,
    ],
  }
}
