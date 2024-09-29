import type { Preset } from 'unocss'
import { presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'
import { commonRules } from '../rules'
import { commonShortcuts } from '../shortcuts'
import { commonTransformers } from '../transformers'
import type { PresetUnitOptions } from './unit'
import { presetUnit } from './unit'

export interface PresetWebOptions extends PresetUnitOptions {

}

export function presetWeb(options: PresetWebOptions = {}): Preset {
  return {
    name: '@djie/unocss-preset-web',
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
      presetTypography(),
      presetWebFonts({
        fonts: {
          sans: 'DM Sans',
          serif: 'DM Serif Display',
          mono: 'DM Mono',
        },
      }),
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
