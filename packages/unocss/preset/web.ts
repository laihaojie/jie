import type { Preset } from 'unocss'
import type { PresetUnitOptions } from './unit'
import { objectMerge } from '@djie/utils'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'
import { commonRules } from '../rules'
import { commonShortcuts } from '../shortcuts'
import { commonTransformers } from '../transformers'

import { presetUnit } from './unit'

export { FileSystemIconLoader }

export interface PresetWebOptions extends PresetUnitOptions {
  optionsPresetUno?: Parameters<typeof presetUno>[0]
  optionsPresetAttributify?: Parameters<typeof presetAttributify>[0]
  optionsPresetIcons?: Parameters<typeof presetIcons>[0]
  optionsPresetTypography?: Parameters<typeof presetTypography>[0]
  optionsPresetWebFonts?: Parameters<typeof presetWebFonts>[0]
  collections?: {
    [key: string]: {
      dir: string
      replace?: (svg: string) => string
    }
  }
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
        collections: options.collections
          ? Object.fromEntries(Object.entries(options.collections).map(([key, value]) => {
            return [
              key,
              FileSystemIconLoader(value.dir, value.replace
                ? value.replace
                : (svg) => {
                    return svg.replace(/(<svg.*?width=)"(.*?)"/, '$1"1em"')
                      .replace(/(<svg.*?height=)"(.*?)"/, '$1"1em"')
                  }),
            ]
          }))
          : {},
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
