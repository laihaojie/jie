import type { Preset } from '@unocss/core'
import { presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'
import { commonShortcuts } from '../shortcuts'
import { commonRules } from '../rules'
import type { PresetUnitOptions } from './unit'
import { presetUnit } from './unit'

export interface PresetWebOptions extends PresetUnitOptions {

}

export function presetWeb(options: PresetWebOptions = {}): Preset {
  return {
    name: '@djie/unocss-preset-web',
    presets: [
      presetUno() as Preset,
      presetAttributify() as Preset,
      presetIcons({
        scale: 1.2,
        warn: true,
      }) as Preset,
      presetTypography() as Preset,
      presetWebFonts({
        fonts: {
          sans: 'DM Sans',
          serif: 'DM Serif Display',
          mono: 'DM Mono',
        },
      }) as Preset,
      ...options.unit ? [presetUnit(options) as Preset] : [],
    ],
    shortcuts: [
      ...commonShortcuts,
    ],
    rules: [
      ...commonRules,
    ],
    safelist: 'prose m-auto text-left'.split(' '),
  }
}
