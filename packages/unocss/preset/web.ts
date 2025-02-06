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
  presetIconCollections?: {
    [key: string]: {
      dir: string
      replace?: (svg: string) => string
    }
  }
  disablePresetUno?: boolean
  disablePresetAttributify?: boolean
  disablePresetIcons?: boolean
  disablePresetTypography?: boolean
  disablePresetWebFonts?: boolean
  disablePresetUnit?: boolean
}

export function presetWeb(_options: PresetWebOptions = {}): Preset {
  const options = objectMerge({
    disablePresetWebFonts: true,
    unit: 'px',
  } as PresetWebOptions, _options) as PresetWebOptions
  return {
    name: '@djie/unocss-preset-web',
    presets: ([] as Preset[])
      .concat(!options.disablePresetUno ? presetUno(options.optionsPresetUno) : [])
      .concat(!options.disablePresetAttributify ? presetAttributify(options.optionsPresetAttributify) : [])
      .concat(!options.disablePresetIcons
        ? presetIcons(objectMerge(options.optionsPresetIcons, {
            scale: 1.2,
            warn: true,
            collections: options.presetIconCollections
              ? Object.fromEntries(Object.entries(options.presetIconCollections).map(([key, value]) => {
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
          }))
        : [])
      .concat(!options.disablePresetTypography ? presetTypography(options.optionsPresetTypography) : [])
      .concat(!options.disablePresetWebFonts
        ? presetWebFonts(objectMerge(options.optionsPresetWebFonts, {
            fonts: {
              sans: 'DM Sans',
              serif: 'DM Serif Display',
              mono: 'DM Mono',
            },
          }))
        : [])
      .concat(options.unit ? presetUnit(options) : []),
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
